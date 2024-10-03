type Book = {
    author: string;
    title: string;
    id: number
}

type BookData = Omit<Book, "id">

type NewBook = {
    id: number
    author: string;
    title: string;
    publishedAt: string;
    category: string;
    summary?: string;
    rating?: number;
}

type NewBookData = Omit<NewBook, "id">