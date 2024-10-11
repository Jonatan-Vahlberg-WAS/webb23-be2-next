import { getAuthors } from "@/actions/getAuthors";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBook } from "@/actions/createBook";

export default async function BookForm() {
  const authors = await getAuthors();

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form method="POST" action={createBook}>
          <Input name="title" placeholder="Book title" />
          <select name="authorId" className="block p-4 border-gray-100 border-2 ">
          {authors.map(author => (
                <option key={author.id} value={author.id}>
                    {author.firstName} {author.lastName}
                </option>
              ))}
          </select>
          <Button type="submit">Create book</Button>
        </form>
      </CardContent>
    </Card>
  );
}
