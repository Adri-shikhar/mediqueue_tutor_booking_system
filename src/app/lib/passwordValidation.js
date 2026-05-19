/** Assignment rules: min 6 chars, one uppercase, one lowercase */
export function getPasswordErrors(password) {
  const errors = [];
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include an uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include a lowercase letter.");
  }
  return errors;
}

export function isPasswordValid(password) {
  return getPasswordErrors(password).length === 0;
}
