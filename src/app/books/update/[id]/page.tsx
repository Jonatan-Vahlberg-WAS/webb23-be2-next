import { getAuthors } from "@/actions/getAuthors";
import { getBook } from "@/actions/getBook";
import BookForm from "@/components/Book/BookForm";

export default async function UpdateBookPage({ params }: any) {
  const authors = await getAuthors();
  const book = await getBook(params.id);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {book && <BookForm authors={authors} book={book} />}
        {!book && <p>Book not found</p>}
      </main>
    </div>
  );
}
