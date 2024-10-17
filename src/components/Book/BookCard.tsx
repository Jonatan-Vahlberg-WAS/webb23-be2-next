import { BookWithAuthor } from "@/types/book";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

type BookCardProps = {
  book: BookWithAuthor;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
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
      </CardHeader>
    </Card>
  );
}
