type Author = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

type AuthorData = Omit<Author, "id">;

type Book = {
  id: string;
  authorId: string;
  title: string;
};

type BookWithAuthor = Omit<Book, "author"> & {
  author: Author;
};

type BookData = Omit<Book, "id">;
