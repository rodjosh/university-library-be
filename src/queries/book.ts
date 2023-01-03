import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import {
  getAllBooks,
  getBook,
  getBooksRequestedByStudent,
  getBooksRequestedByStudents,
} from "@src/database/controllers/book";
import { bookType } from "@src/graphql/types/book";

export const qBooks: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(bookType),
  args: {
    offset: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    genre: { type: GraphQLString },
  },
  resolve: async (obj, { offset, limit, title, author, genre }) => {
    return await getAllBooks(offset, limit, title, author, genre);
  },
};

export const qBooksRequestedByStudent: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(bookType),
  args: {
    student_id: { type: new GraphQLNonNull(GraphQLString) },
    offset: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    genre: { type: GraphQLString },
  },
  resolve: async (obj, { student_id, offset, limit, title, author, genre }) => {
    return await getBooksRequestedByStudent(
      student_id,
      offset,
      limit,
      title,
      author,
      genre
    );
  },
};

export const qBooksRequestedByStudents: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(bookType),
  args: {
    offset: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    genre: { type: GraphQLString },
  },
  resolve: async (obj, { offset, limit, title, author, genre }) => {
    return await getBooksRequestedByStudents(
      offset,
      limit,
      title,
      author,
      genre
    );
  },
};

export const qBook: GraphQLFieldConfig<any, any> = {
  type: bookType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { id }) => {
    return await getBook(id);
  },
};
