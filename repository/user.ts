import { IProfile, IUser } from '../model/types';
import { InternalServerError, NotFoundError } from '../model/error';
import { DB } from './db';
import { IUserRepo } from '../model/repository';

export class UserRepo extends DB implements IUserRepo {
	constructor() {
		super();
	}

	async createUser({
		profile,
	}: {
		profile: IProfile;
	}): Promise<{ user: IUser | null; error: Error | null }> {
		try {
			const user = new this.userModel({
				profile,
			});
			const savedUser = await user.save();
			return { user: savedUser, error: null };
		} catch (error) {
			return {
				user: null,
				error: new InternalServerError((error as Error).message),
			};
		}
	}

	async getUserByUserName({
		username,
	}: {
		username: string;
	}): Promise<{ user: IUser | null; error: Error | null }> {
		try {
			const user = await this.userModel.findOne({
				'profile.userName': username,
			});
			return { user, error: null };
		} catch (error) {
			return {
				user: null,
				error: new InternalServerError((error as Error).message),
			};
		}
	}

	async deleteUser({
		user,
		username,
	}: {
		user?: IUser;
		username?: string;
	}): Promise<{ error: Error | null }> {
		try {
			const result = this.userModel
				.deleteOne({
					'profile.userName': user?.profile.userName || username,
				})
				.exec();
			if (!result) {
				return {
					error: new NotFoundError(`User ${username} not found`),
				};
			}
			return { error: null };
		} catch (error) {
			return { error: new InternalServerError((error as Error).message) };
		}
	}

	async updateUserPassword({
		username,
		password,
		saltedPassword,
	}: {
		username: string;
		password: string;
		saltedPassword: string;
	}): Promise<{ error: Error | null }> {
		try {
			const result = this.userModel
				.updateOne(
					{ 'profile.userName': username },
					{
						$set: {
							'profile.password': password,
							'profile.saltedPassword': saltedPassword,
						},
					}
				)
				.exec();
			if (!result) {
				return { error: new NotFoundError(`${username} not found`) };
			}
			return { error: null };
		} catch (error) {
			return { error: new InternalServerError((error as Error).message) };
		}
	}

	async updateUserEmail({
		username,
		email,
	}: {
		username: string;
		email: string;
	}): Promise<{ error: Error | null }> {
		try {
			const result = this.userModel
				.updateOne(
					{ 'profile.userName': username },
					{
						$set: {
							'profile.email': email,
						},
					}
				)
				.exec();
			if (!result) {
				return { error: new NotFoundError(`${username} not found`) };
			}
			return { error: null };
		} catch (error) {
			return { error: new InternalServerError((error as Error).message) };
		}
	}

	async getUserByEmail({
		email,
	}: {
		email: string;
	}): Promise<{ user: IUser | null; error: Error | null }> {
		try {
			return {
				user: await this.userModel.findOne({ 'profile.email': email }),
				error: null,
			};
		} catch (error) {
			return {
				user: null,
				error: new InternalServerError((error as Error).message),
			};
		}
	}
}
