import { IError } from '../interfaces';

export class ErrorHandler {
	static badRequest(message: string): IError {
		const error = new Error(message) as IError;
		error.code = 400;
		return error;
	}

	static notFound(message: string): IError {
		const error = new Error(message) as IError;
		error.code = 404;
		return error;
	}

	static internal(message: string): IError {
		const error = new Error(message) as IError;
		error.code = 500;
		return error;
	}

	static conflict(message: string): IError {
		const error = new Error(message) as IError;
		error.code = 409;
		return error;
	}
}
