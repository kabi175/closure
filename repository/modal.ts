import { Schema } from 'mongoose';
import { IProfile, ICPSites, ISocial, IUser } from '../model/types';

const ProfileSchema = new Schema<IProfile>({
	displayName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	saltedPassword: {
		type: String,
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

const SocialSchema = new Schema<ISocial>({
	linkedIn: String,
	gitHub: String,
	stackOverflow: String,
});

const CPSitesSchema = new Schema<ICPSites>({
	hackerRank: String,
	hackerEarth: String,
	codeChef: String,
	codeForces: String,
	binarySearch: String,
});

export const UserSchema = new Schema<IUser>({
	profile: { type: ProfileSchema, required: true },
	social: SocialSchema,
	cpsites: CPSitesSchema,
});
