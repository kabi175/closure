import { IProfile, IUser } from './types';

export interface IUserRepo {
	createUser({}: {
		profile: IProfile;
	}): Promise<{ user: IUser | null; error: Error | null }>;

	deleteUser({}: {
		user?: IUser;
		username?: string;
	}): Promise<{ error: Error | null }>;

	getUserByUserName({}: {
		username: string;
	}): Promise<{ user: IUser | null; error: Error | null }>;

	getUserByEmail({}: {
		email: string;
	}): Promise<{ user: IUser | null; error: Error | null }>;

	updateUserPassword({}: {
		username: string;
		password: string;
		saltedPassword: string;
	}): Promise<{ error: Error | null }>;

	updateUserEmail({}: {
		username: string;
		email: string;
	}): Promise<{ error: Error | null }>;
}
