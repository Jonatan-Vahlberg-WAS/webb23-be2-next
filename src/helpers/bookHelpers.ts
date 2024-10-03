
export function isWithAuthor(book: Book | BookWithAuthor): book is BookWithAuthor {
    return typeof book.author !== "number"
}

export function includeAuthor(
  book: Book | BookWithAuthor,
  authors: Author[]
): Book | BookWithAuthor {
  const author = authors.find((author) => author.id === book.author);
  if (author) {
    return {
      ...book,
      author,
    } as BookWithAuthor;
  }
  return book;
}
