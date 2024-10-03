
type Book = {
    id: number
    author: string;
    title: string;
    publishedAt: string;
    category: string;
    summary?: string;
    rating?: number;
}

type BookData = Omit<Book, "id">