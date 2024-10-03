
type Author = {
    id: number
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

type Book = {
    id: number
    author: number;
    title: string;
    publishedAt: string;
    category: string;
    summary?: string;
    rating?: number;
}

type BookWithAuthor = Omit<Book, "author"> & {
    author: Author
}

type BookData = Omit<Book, "id">