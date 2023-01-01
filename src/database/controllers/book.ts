import { Op } from "sequelize";
import { Book } from "@src/database/models/book";
import { BookInterface } from "@src/database/models/types";
import { User } from "@src/database/models/user";

interface CreateBookProps {
  title: string;
  author: string;
  published_year: number;
  genre: string;
  available_copies: number;
}

export const createBook = async ({
  title,
  author,
  published_year,
  genre,
  available_copies,
}: CreateBookProps) => {
  return await Book.create({
    title,
    author,
    published_year,
    genre,
    available_copies,
    checkout_by_user_ids: [],
  });
};

export const updateBook = async (
  id: string,
  attrs: Partial<Omit<BookInterface, "id">>
) => {
  const book = await Book.findByPk(id);
  if (!book) return;

  await book.update({ ...attrs });
  await book.reload();
  return book;
};

export const getBook = async (id: string) => {
  return await Book.findByPk(id);
};

export const getAllBooks = async (
  offset?: number,
  limit?: number,
  title?: string,
  author?: string,
  genre?: string
) => {
  return await Book.findAll({
    offset,
    limit,
    where: {
      title: {
        [Op.iLike]: `%${title ?? ""}%`,
      },
      author: {
        [Op.iLike]: `%${author ?? ""}%`,
      },
      genre: {
        [Op.iLike]: `%${genre ?? ""}%`,
      },
    },
  });
};

export const checkoutBook = async (book_id: string, student_id: string) => {
  const book = await Book.findByPk(book_id);
  const user = await User.findByPk(student_id);
  if (!book || !user) return;

  if (book?.available_copies < 1) return;

  const checkout_by_users_ids = new Set(book?.checkout_by_user_ids);
  const requested_books_ids = new Set(user?.requested_book_ids);

  if (checkout_by_users_ids.has(user.id)) {
    return book;
  }

  checkout_by_users_ids.add(user.id);
  requested_books_ids.add(book_id);

  book.available_copies -= 1;
  book.checkout_by_user_ids = Array.from(checkout_by_users_ids);
  user.requested_book_ids = Array.from(requested_books_ids);

  await book.save();
  await user.save();

  return await book.reload();
};

export const returnBook = async (book_id: string, student_id: string) => {
  const book = await Book.findByPk(book_id);
  const user = await User.findByPk(student_id);
  if (!book || !user) return;

  const checkout_by_users_ids = new Set(book?.checkout_by_user_ids);
  const requested_books_ids = new Set(user?.requested_book_ids);

  if (!checkout_by_users_ids.has(user.id)) {
    return book;
  }

  checkout_by_users_ids.delete(user.id);
  requested_books_ids.delete(book_id);

  book.available_copies += 1;
  book.checkout_by_user_ids = Array.from(checkout_by_users_ids);
  user.requested_book_ids = Array.from(requested_books_ids);

  await book.save();
  await user.save();

  return await book.reload();
};

export const deleteBook = async (id: string) => {
  const book = await Book.findByPk(id);
  if (!book) return;

  return await book.destroy();
};
