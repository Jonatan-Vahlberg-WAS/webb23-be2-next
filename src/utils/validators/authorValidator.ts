

export default function authorValidator(data: AuthorData | Author, id?: number): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if((data as Author).id !== undefined) {
    if((data as Author).id !== id) {
      errors.id = "Id missmatch"
    }
  }
  if (!data.firstName) {
    errors.firstName = "First name is required";
  }
  if (!data.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!data.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors]
}
