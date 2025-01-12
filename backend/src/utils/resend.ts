import { Resend } from "resend";
import { FROM_EMAIL, NODE_ENV, RESEND_API } from "../constants/env";


const resend = new Resend(RESEND_API)

type Params = {
	to: string,
	subject: string,
	text: string,
	html: string,
}

const getFromEmail = () => {
	return NODE_ENV === 'development' ?
		"onboarding@resend.dev" : FROM_EMAIL
}

const getToEmail = (to: string) => {
	return NODE_ENV === 'development' ?
		"delivered@resend.dev" : to
}


export const sendMail = async ({ to, subject, html, text }: Params) => {
	return await resend.emails.send({
		from: getFromEmail(),
		to: getToEmail(to),
		subject,
		html,
		text,
	})
}
