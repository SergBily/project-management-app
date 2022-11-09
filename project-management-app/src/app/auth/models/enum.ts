export enum MessageError {
  required = 'That field is required',
  email = 'Please enter a valid email address',
  hasUpperAndLowercase = 'Your password isn\'t strong enough need of both uppercase and lowercase letters',
  hasMinCharacters = 'Your password isn\'t strong enough need at least 8 characters',
  hasLettersAndNumbers = 'Your password isn\'t strong enough need a mixture of letters and numbers',
  hasSpecialCharacter = `Your password isn't strong enough need
  inclusion of at least one special character, e.g., ! @ # ? % ^ & *]`,
  badResponse = 'You entered the wrong login or password ',
  successResponse = 'SUCCESS',
  badResponseSignup = 'Server not responding, please try again later',
  deleteUserError = 'User was not founded!',
  updateSuccess = 'Profile updated successfully',
}
