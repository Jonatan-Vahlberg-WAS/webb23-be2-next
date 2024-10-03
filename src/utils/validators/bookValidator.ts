type ErrorObject = {
    [key: string]: any;
}

export default function bookValidator(data: BookData): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
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
