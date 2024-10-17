import { getBooks } from "@/actions/getBooks";
import AuthForm from "@/components/Auth/AuthForm";
import BookCard from "@/components/Book/BookCard";
import BookingCalendar from "@/components/Booking/BookingCalendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home(props: any) {
  console.log("search params %%", props);
  const data = await getBooks(props.searchParams);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AuthForm />
        <div className="flex gap-4 flex-wrap mb-4">
          {data.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <Link href="/books/new">
          <Button type="button" variant="default">
            Add new book
          </Button>
        </Link>
      <BookingCalendar/>
      </main>
    </div>
  );
}
