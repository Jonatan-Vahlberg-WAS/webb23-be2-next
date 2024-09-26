type Book = {
    author: string;
    title: string;
    id: number
}

type BookData = Omit<Book, "id">