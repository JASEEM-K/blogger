
export interface IUser {
	_id: string,
	username: string,
	email: string,
	profilePic?: string,
	verify: boolean,
}

export interface updateUser {
	username: string,
	profilePic: string,
}

export interface loginParams {
	username: string,
	password: string,
}

export interface registerParams extends loginParams {
	email: String,
}

export interface resetParams {
	password: string,
	confirmPassword: string,
}

export interface sendCodeParams {
	email: string,
}
