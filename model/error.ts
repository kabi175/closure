abstract class CustomError extends Error {
	readonly _type: string;
	readonly _code: number | null;
	readonly _message: string | null;
	constructor(type: string, code?: number | null, message?: string) {
		super(type);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this._message = message || null;
		this._type = type;
		this._code = code || null;
	}
	toString(): string {
		if (this._message) return `${this._type} : ${this._message}`;
		return this._type;
	}
	log(): void {
		console.error(this.toString());
	}
	toObj(): { type: string; code: number | null; message: string | null } {
		return {
			type: this._type,
			code: this._code,
			message: this._message,
		};
	}
}

export class NotFoundError extends CustomError {
	constructor(message: string) {
		super('Resource Not Found', 404, message);
	}
}

export class BadRequestError extends CustomError {
	constructor(message: string) {
		super('Bad Request', 400, message);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message: string) {
		super('Unauthorized', 401, message);
	}
}

export class InternalServerError extends CustomError {
	constructor(message: string) {
		super('Internal Server Error', 500, message);
	}
	toObj(): { type: string; code: number | null; message: string | null } {
		return {
			type: this._type,
			code: this._code,
			message: null,
		};
	}
}
export class ConflictError extends CustomError {
	constructor(message: string) {
		super('Conflict', 409, message);
	}
}

export class ForbiddenError extends CustomError {
	constructor(message: string) {
		super('Forbidden', 403, message);
	}
}

export class PaymentRequiredError extends CustomError {
	constructor(message: string) {
		super('Payment Required', 402, message);
	}
}
export class UnprocessableEntityError extends CustomError {
	constructor(message: string) {
		super('Unprocessable Entity', 422, message);
	}
}
