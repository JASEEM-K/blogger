
export interface IBlog {
	_id?: string,
	author?: IUser,
	title?: string,
	titlePic?: string,
	tag?: string,
	content?: string,
	likes?: string[],
	comment?: IComment[],
	createdAt?: string,
}

export interface IUser {
	_id?: string,
	username?: string,
	email?: string,
	profilePic?: string,
}

export interface IComment {
	_id?: string,
	author?: IUser,
	content?: string,
	likes?: string[],
	createdAt?: string,
}

export interface createParams {
	title: string,
	content: string,
	titlePic: string,
	tag: string,
}

export interface updateParams {
	title?: string,
	content?: string,
	titlePic?: string,
	tag?: string,
}

export interface commentParams {
	content: string
}

export interface uploadParams {
	image: string,
}

