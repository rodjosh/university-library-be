import { mCreateUser, mUpdateUser, mDeleteUser } from "@src/mutations/user";

import {
  mCreateBook,
  mUpdateBook,
  mDeleteBook,
  mCheckoutBook,
  mReturnBook,
} from "@src/mutations/book";

export const mutations = {
  mCreateUser,
  mUpdateUser,
  mDeleteUser,

  mCreateBook,
  mUpdateBook,
  mDeleteBook,
  mCheckoutBook,
  mReturnBook,
};
