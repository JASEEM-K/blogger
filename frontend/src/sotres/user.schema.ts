
export interface IUser {
	_id: string,
	username: string,
	email: string,
	verify: boolean,
}

export interface loginParams {
	username: string,
	password: string,
}

export interface registerParams extends loginParams {
	email: String,
}
