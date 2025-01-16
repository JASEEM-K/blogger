import { compare, hash } from 'bcrypt'

export const hashValue = async (value: string, saltRounds?: number) => hash(value, saltRounds || 10)

export const compareValue = async (value: string, hash: string) =>
	compare(value, hash).catch(() => {
		return false
	})

