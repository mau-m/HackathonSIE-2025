class MissingValueFormError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingValueFormError';
  }
}
module.exports = MissingValueFormError;