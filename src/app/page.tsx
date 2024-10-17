import { getBooks } from "@/actions/getBooks";
import AuthForm from "@/components/Auth/AuthForm";
import BookCard from "@/components/Book/BookCard";
import BookForm from "@/components/Book/BookForm";

export default async function Home(props: any) {
  console.log("search params %%", props)
  const data = await getBooks(props.searchParams);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AuthForm />
        <BookForm />
        <div className="flex gap-4 flex-wrap">
        {data.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
        </div>
      </main>
    </div>
  );
}
