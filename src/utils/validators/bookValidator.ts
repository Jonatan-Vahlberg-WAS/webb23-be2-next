
export default function bookValidator(data: BookData | Book, id?: number): [boolean, ErrorObject] {
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
  if (!data.author) {
    errors.author = "Author is required";
  }
  if (!data.category) {
    errors.category = "Category is required";
  }
  if (!data.publishedAt) {
    errors.publishedAt = "Published at has to be a date";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors]
}
