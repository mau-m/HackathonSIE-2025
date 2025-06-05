class InvalidValueFormError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DataTypeFormError';
    }
}
module.exports = InvalidValueFormError;