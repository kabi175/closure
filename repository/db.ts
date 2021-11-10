import mongoose, { Model } from 'mongoose';
import { UserSchema } from './modal';
import { IUser } from '../model/types';

export class DB {
	protected userModel: Model<IUser>;

	constructor() {
		const { MONGODB_URL } = process.env;
		mongoose.connect(MONGODB_URL as string, (error) => {
			if (error) {
				throw error;
			} else {
				console.log('Database Connected Successfully');
			}
		});
		this.userModel = mongoose.model('User', UserSchema);
	}
}
