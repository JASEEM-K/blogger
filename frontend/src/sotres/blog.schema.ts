
export interface IBlog {
	_id?: string,
	author?: string,
	title?: string,
	content?: string,
	likes?: string[],
	comment?: IComment,
}

export interface IComment {
	_id?: string,
	author?: string,
	content?: string,
	createdAt?: string,
}

export interface createParams {
	title: string,
	content: string,
}

export interface updateParams {
	title?: string,
	content?: string,
}

export interface commentParams {
	content: string
}
