class NotFoundFormError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundFormError';
    }
}

module.exports = NotFoundFormError;