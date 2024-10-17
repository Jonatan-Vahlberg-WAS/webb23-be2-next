import { BookData } from "@/types/book";
import { Book } from "@prisma/client";

export default function bookValidator(data: BookData | Book, id?: string): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if((data as Book).id !== undefined) {
    console.log("book", data, id)
    if((data as Book).id !== id) {
      errors.id = "Id missmatch"
    }
  }
  if (!data.title) {
    errors.title = "Title is required";
  }
  if (!data.authorId) {
    errors.author = "Author is required";
  }
  if(!data.cover) {
    errors.cover = "Cover is required";
  }
  if(!data.categories || Array.isArray(data.categories) && data.categories.length === 0) {
    errors.categories = "Categories is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors]
}
