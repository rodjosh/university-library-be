// import { Op } from "sequelize";
// import { Book } from "@src/database/models/book";
import { BookInterface } from "@src/database/models/types";
// import { User } from "@src/database/models/user";
// import { getSequelize } from "@src/database/init";

import { getBooksCollection } from "@src/database/models/book";
import { ObjectId, StrictFilter } from "mongodb";
import { getUsersCollection } from "@src/database/models/user";

// const sequelize = getSequelize();
export interface CreateBookProps {
  title: string;
  author: string;
  published_year: number;
  genre: string;
  available_copies: number;
}

// export const createBook = async ({
//   title,
//   author,
//   published_year,
//   genre,
//   available_copies,
// }: CreateBookProps) => {
//   return await Book.create({
//     title,
//     author,
//     published_year,
//     genre,
//     available_copies,
//     checkout_by_user_ids: [],
//   });
// };

export const createBook = async ({
  title,
  author,
  published_year,
  genre,
  available_copies,
}: CreateBookProps) => {
  const books = await getBooksCollection();

  return await books.insertOne({
    title,
    author,
    published_year,
    genre,
    available_copies,
    checkout_by_user_ids: [],
  });
};

// export const updateBook = async (
//   id: string,
//   attrs: Partial<Omit<BookInterface, "id">>
// ) => {
//   const book = await Book.findByPk(id);
//   if (!book) return;

//   await book.update({ ...attrs });
//   await book.reload();
//   return book;
// };

export const updateBook = async (
  id: string,
  attrs: Partial<Omit<BookInterface, "_id">>
) => {
  const books = await getBooksCollection();
  const book = await books.findOneAndUpdate({ _id: new ObjectId(id) }, attrs, {
    returnDocument: "after",
  });

  return book.value;
};

// export const getBook = async (id: string) => {
//   return await Book.findByPk(id);
// };

export const getBook = async (id: string) => {
  const books = await getBooksCollection();
  return await books.findOne({ _id: new ObjectId(id) });
};

// export const getAllBooks = async (
//   offset?: number,
//   limit?: number,
//   title?: string,
//   author?: string,
//   genre?: string
// ) => {
//   return await Book.findAll({
//     offset,
//     limit,
//     where: {
//       title: { [Op.iLike]: `%${title ?? ""}%` },
//       author: { [Op.iLike]: `%${author ?? ""}%` },
//       genre: { [Op.iLike]: `%${genre ?? ""}%` },
//     },
//   });
// };

export const getAllBooks = async (
  offset?: number,
  limit?: number,
  title?: string,
  author?: string,
  genre?: string
) => {
  const books = await getBooksCollection();

  const filter: StrictFilter<CreateBookProps> = {};
  if (title) filter.title = { $regex: `.*${title}.*`, $options: "i" };
  if (author) filter.author = { $regex: `.*${author}.*`, $options: "i" };
  if (genre) filter.genre = { $regex: `.*${genre}.*`, $options: "i" };

  let cursor = books.find(filter);
  if (offset || offset === 0) cursor = cursor.skip(offset);
  if (limit || limit === 0) cursor = cursor.limit(limit);

  const booksRes = await cursor.toArray();
  return booksRes;
};

// export const getBooksRequestedByStudent = async (
//   student_id: string,
//   offset?: number,
//   limit?: number,
//   title?: string,
//   author?: string,
//   genre?: string
// ) => {
//   return await Book.findAll({
//     offset,
//     limit,
//     where: {
//       checkout_by_user_ids: { [Op.contains]: [student_id] },
//       title: { [Op.iLike]: `%${title ?? ""}%` },
//       author: { [Op.iLike]: `%${author ?? ""}%` },
//       genre: { [Op.iLike]: `%${genre ?? ""}%` },
//     },
//   });
// };

export const getBooksRequestedByStudent = async (
  student_id: string,
  offset?: number,
  limit?: number,
  title?: string,
  author?: string,
  genre?: string
) => {
  const books = await getBooksCollection();

  const filter: StrictFilter<CreateBookProps> = {
    checkout_by_user_ids: student_id,
  };

  if (title) filter.title = { $regex: `.*${title}.*`, $options: "i" };
  if (author) filter.author = { $regex: `.*${author}.*`, $options: "i" };
  if (genre) filter.genre = { $regex: `.*${genre}.*`, $options: "i" };

  let cursor = books.find(filter);
  if (offset || offset === 0) cursor = cursor.skip(offset);
  if (limit || limit === 0) cursor = cursor.limit(limit);

  const booksRes = await cursor.toArray();
  return booksRes;
};

// export const getBooksRequestedByStudents = async (
//   offset?: number,
//   limit?: number,
//   title?: string,
//   author?: string,
//   genre?: string
// ) => {
//   return await Book.findAll({
//     offset,
//     limit,
//     where: [
//       sequelize.where(
//         sequelize.fn("array_length", sequelize.col("checkout_by_user_ids"), 1),
//         { [Op.gt]: 0 }
//       ),
//       {
//         title: { [Op.iLike]: `%${title ?? ""}%` },
//         author: { [Op.iLike]: `%${author ?? ""}%` },
//         genre: { [Op.iLike]: `%${genre ?? ""}%` },
//       },
//     ],
//   });
// };

export const getBooksRequestedByStudents = async (
  offset?: number,
  limit?: number,
  title?: string,
  author?: string,
  genre?: string
) => {
  const books = await getBooksCollection();

  const filter: StrictFilter<CreateBookProps> = {
    $where: `this.checkout_by_user_ids.length > 0`,
  };
  if (title) filter.title = { $regex: `.*${title}.*`, $options: "i" };
  if (author) filter.author = { $regex: `.*${author}.*`, $options: "i" };
  if (genre) filter.genre = { $regex: `.*${genre}.*`, $options: "i" };

  let cursor = books.find(filter);
  if (offset || offset === 0) cursor = cursor.skip(offset);
  if (limit || limit === 0) cursor = cursor.limit(limit);

  const booksRes = await cursor.toArray();
  return booksRes;
};

// export const checkoutBook = async (book_id: string, student_id: string) => {
//   const book = await Book.findByPk(book_id);
//   const user = await User.findByPk(student_id);
//   if (!book || !user) return;

//   if (book?.available_copies < 1) return;

//   const checkout_by_users_ids = new Set(book?.checkout_by_user_ids);
//   const requested_books_ids = new Set(user?.requested_book_ids);

//   if (checkout_by_users_ids.has(user.id)) {
//     return book;
//   }

//   checkout_by_users_ids.add(user.id);
//   requested_books_ids.add(book_id);

//   book.available_copies -= 1;
//   book.checkout_by_user_ids = Array.from(checkout_by_users_ids);
//   user.requested_book_ids = Array.from(requested_books_ids);

//   await book.save();
//   await user.save();

//   return await book.reload();
// };

export const checkoutBook = async (book_id: string, student_id: string) => {
  const bookCollection = await getBooksCollection();
  const userCollection = await getUsersCollection();

  const book = await bookCollection.findOne({ _id: new ObjectId(book_id) });
  const user = await userCollection.findOne({ _id: new ObjectId(student_id) });

  if (!book || !user) return undefined;
  if (book.available_copies < 1) return undefined;

  const checkout_by_users_ids = new Set(book.checkout_by_user_ids);
  const requested_books_ids = new Set(user.requested_book_ids);

  if (checkout_by_users_ids.has(student_id.toString())) {
    return book;
  }

  checkout_by_users_ids.add(student_id.toString());
  requested_books_ids.add(book_id);

  const result = await bookCollection.findOneAndUpdate(
    { _id: new ObjectId(book_id), available_copies: { $gt: 0 } },
    {
      $set: {
        checkout_by_user_ids: Array.from(checkout_by_users_ids),
        available_copies: book.available_copies - 1,
      },
    },
    { returnDocument: "after" }
  );

  if (!result.value) {
    return undefined;
  }

  const updatedBook = result.value;

  await userCollection.findOneAndUpdate(
    { _id: new ObjectId(student_id) },
    { $set: { requested_book_ids: Array.from(requested_books_ids) } },
    { returnDocument: "after" }
  );

  return updatedBook;
};

// export const returnBook = async (book_id: string, student_id: string) => {
//   const book = await Book.findByPk(book_id);
//   const user = await User.findByPk(student_id);
//   if (!book || !user) return;

//   const checkout_by_users_ids = new Set(book?.checkout_by_user_ids);
//   const requested_books_ids = new Set(user?.requested_book_ids);

//   if (!checkout_by_users_ids.has(user.id)) {
//     return book;
//   }

//   checkout_by_users_ids.delete(user.id);
//   requested_books_ids.delete(book_id);

//   book.available_copies += 1;
//   book.checkout_by_user_ids = Array.from(checkout_by_users_ids);
//   user.requested_book_ids = Array.from(requested_books_ids);

//   await book.save();
//   await user.save();

//   return await book.reload();
// };

export const returnBook = async (book_id: string, student_id: string) => {
  const bookCollection = await getBooksCollection();
  const userCollection = await getUsersCollection();

  const book = await bookCollection.findOne({ _id: new ObjectId(book_id) });
  const user = await userCollection.findOne({ _id: new ObjectId(student_id) });

  if (!book || !user) return undefined;

  const checkout_by_users_ids = new Set(book.checkout_by_user_ids);
  const requested_books_ids = new Set(user.requested_book_ids);

  if (!checkout_by_users_ids.has(user._id.toString())) {
    return book;
  }

  checkout_by_users_ids.delete(user._id.toString());
  requested_books_ids.delete(book_id);

  const result = await bookCollection.findOneAndUpdate(
    { _id: new ObjectId(book_id) },
    {
      $set: {
        checkout_by_user_ids: Array.from(checkout_by_users_ids),
        available_copies: book.available_copies + 1,
      },
    },
    { returnDocument: "after" }
  );

  if (!result.value) {
    return undefined;
  }

  const updatedBook = result.value;

  await userCollection.findOneAndUpdate(
    { _id: new ObjectId(student_id) },
    { $set: { requested_book_ids: Array.from(requested_books_ids) } },
    { returnDocument: "after" }
  );

  return updatedBook;
};

// export const deleteBook = async (id: string) => {
//   const book = await Book.findByPk(id);
//   if (!book) return;

//   return await book.destroy();
// };

export const deleteBook = async (id: string) => {
  const books = await getBooksCollection();
  const result = await books.findOneAndDelete({ _id: new ObjectId(id) });
  return result.value;
};
