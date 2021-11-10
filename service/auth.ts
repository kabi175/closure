import { NotFoundError } from '../model/error';
import { IUserRepo } from '../model/repository';
import { IAuthService, ITokenService } from '../model/service';
import { IProfile, IUser } from '../model/types';

export class AuthService implements IAuthService {
	private userRepo: IUserRepo;
	private tokenService: ITokenService;

	constructor({
		userRepo,
		tokenService,
	}: {
		userRepo: IUserRepo;
		tokenService: ITokenService;
	}) {
		this.userRepo = userRepo;
		this.tokenService = tokenService;
	}

	async signUp({
		profile,
	}: {
		profile: IProfile;
	}): Promise<{ error: Error | null }> {
		return this.userRepo.createUser({ profile });
	}

	private async signIn({
		user,
		password,
	}: {
		user: IUser | null;
		password: string;
	}): Promise<{ token: string | null; error: Error | null }> {
		if (!user || user.profile.password != password) {
			return {
				token: null,
				error: new NotFoundError(
					`username and password does not match`
				),
			};
		}
		return await this.tokenService.generateToken({
			username: user.profile.userName,
			role: 'user',
		});
	}

	async signInWithUserName({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<{ token: string | null; error: Error | null }> {
		const { user, error } = await this.userRepo.getUserByUserName({
			username,
		});
		if (error) return { token: null, error };
		return await this.signIn({ user, password });
	}

	async signInWithEmail({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<{ token: string | null; error: Error | null }> {
		const { user, error } = await this.userRepo.getUserByEmail({
			email,
		});
		if (error) return { token: null, error };
		return await this.signIn({ user, password });
	}

	async verifyUser({ token }: { token: string }): Promise<{
		username: string | null;
		role: string | null;
		error: Error | null;
	}> {
		return await this.tokenService.decodeToken({ token });
	}
}
