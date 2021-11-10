export interface IProfile {
	displayName: string;
	userName: string;
	email: string;
	password: string;
	saltedPassword: string;
	verified?: boolean;
}

export interface ISocial {
	linkedIn: string;
	gitHub: string;
	stackOverflow: string;
}

export interface ICPSites {
	hackerRank: string;
	hackerEarth: string;
	codeChef: string;
	codeForces: string;
	binarySearch: string;
}

export interface IUser {
	_id: string;
	profile: IProfile;
	social?: ISocial;
	cpsites?: ICPSites;
}
