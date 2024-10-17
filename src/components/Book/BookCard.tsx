import { BookWithAuthor } from "@/types/book";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import BookCover from "./BookCover";

type BookCardProps = {
  book: BookWithAuthor;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <BookCover
        cover={book.cover}
      />
        <p>
          <em>
            {book.author.firstName} {book.author.lastName}
          </em>
        </p>
        <div className="flex space-x-2">
          {book.categories.map((category) => (
            <Link key={category} href={`?category=${category}`}>
              <Badge>{category}</Badge>
            </Link>
          ))}
        </div>
    </Card>
  );
}
