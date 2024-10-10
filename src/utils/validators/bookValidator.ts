
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
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors]
}
