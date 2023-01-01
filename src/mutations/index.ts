import {
  mCreateUser,
  mUpdateUser,
  mLoginUser,
  mDeleteUser,
} from "@src/mutations/user";

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
  mLoginUser,
  mDeleteUser,

  mCreateBook,
  mUpdateBook,
  mDeleteBook,
  mCheckoutBook,
  mReturnBook,
};
