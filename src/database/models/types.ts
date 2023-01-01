export interface UserInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
  requested_book_ids: string[];
  password: string;
}

export interface BookInterface {
  id: string;
  title: string;
  author: string;
  published_year: number;
  genre: string;
  available_copies: number;
  checkout_by_user_ids: string[];
}
