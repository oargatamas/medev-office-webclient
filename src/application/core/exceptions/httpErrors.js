
const errorNames = {
    400 : "Bad request",
    401 : "Invalid or expired credentials",
    403 : "Missing permission",
    404 : "Not found",
    500 : "Internal server error",
};


class HTTPError extends Error {
    constructor(code, message, extras) {
        super(message + " " + errorNames[code]);
        if (arguments.length >= 3 && extras) {
            Object.assign(this, extras);
        }
        this.name = errorNames[code];
        this.statusCode = code;
    }
}
export default HTTPError;

export function BadRequestError (message, extras) {
    return new HTTPError(400, message, extras);
}

export function UnauthorizedError (message, extras = {}) {
    return new HTTPError(401, message, extras);
}

export function ForbiddenError (message, extras) {
    return new HTTPError(403, message, extras);
}

export function NotFoundError (message, extras) {
    return new HTTPError(404, message, extras);
}