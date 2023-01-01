import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import {
  checkoutBook,
  createBook,
  deleteBook,
  returnBook,
  updateBook,
} from "@src/database/controllers/book";

import { bookType } from "@src/graphql/types/book";

export const mCreateBook: GraphQLFieldConfig<any, any> = {
  type: bookType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    published_year: { type: new GraphQLNonNull(GraphQLInt) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    available_copies: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (
    obj,
    { title, author, published_year, genre, available_copies }
  ) => {
    return await createBook({
      title,
      author,
      published_year,
      genre,
      available_copies,
    });
  },
};

export const mUpdateBook: GraphQLFieldConfig<any, any> = {
  type: bookType,
  args: {
    book_id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    published_year: { type: GraphQLInt },
    genre: { type: GraphQLString },
    available_copies: { type: GraphQLInt },
  },
  resolve: async (obj, { book_id, ...attrs }) => {
    return await updateBook(book_id, attrs);
  },
};

export const mDeleteBook: GraphQLFieldConfig<any, any> = {
  type: bookType,
  args: {
    book_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { book_id }) => {
    return await deleteBook(book_id);
  },
};

export const mCheckoutBook: GraphQLFieldConfig<any, any> = {
  type: GraphQLBoolean,
  args: {
    book_id: { type: new GraphQLNonNull(GraphQLString) },
    student_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { book_id, student_id }) => {
    return (await checkoutBook(book_id, student_id)) ?? false;
  },
};

export const mReturnBook: GraphQLFieldConfig<any, any> = {
  type: bookType,
  args: {
    book_id: { type: new GraphQLNonNull(GraphQLString) },
    student_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { book_id, student_id }) => {
    return await returnBook(book_id, student_id);
  },
};
