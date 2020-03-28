module.exports = class Message {
    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message) {
        this.message = message;
    }
}