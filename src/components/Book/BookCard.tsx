import { BookWithAuthor } from "@/types/book";
import { Card, CardHeader, CardTitle } from "../ui/card";

type BookCardProps = {
    book: BookWithAuthor
}

export default function BookCard({ book }:BookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <p>
          <em>
            {book.author.firstName} {book.author.lastName}
          </em>
        </p>
      </CardHeader>
    </Card>
  );
}
