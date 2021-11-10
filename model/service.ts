import { IProfile } from './types';

export interface IAuthService {
	signUp({}: { profile: IProfile }): Promise<{ error: Error | null }>;

	signInWithUserName({}: {
		username: string;
		password: string;
	}): Promise<{ token: string | null; error: Error | null }>;

	signInWithEmail({}: {
		email: string;
		password: string;
	}): Promise<{ token: string | null; error: Error | null }>;

	verifyUser({}: { token: string }): Promise<{
		username: string | null;
		role: string | null;
		error: Error | null;
	}>;

	generateResetLink({}: {
		username?: string;
		email?: string;
	}): Promise<{ resetLink: string; error: Error | null }>;

	resetPassword({}: {
		username?: string;
		email?: string;
		resetLink: string;
	}): Promise<{ error: Error | null }>;
}

export interface ITokenService {
	generateToken({}: {
		username: string;
		role: string;
	}): Promise<{ token: string; error: Error | null }>;

	decodeToken({}: { token: string }): Promise<{
		username: string | null;
		role: string | null;
		error: Error | null;
	}>;
}
