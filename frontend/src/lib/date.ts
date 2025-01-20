

export const getDate = (createdAt: string) => {
	const dates = createdAt.split('-')
	switch (dates[1]) {
		case "01":
			dates[1] = "Jan"
			break;
		case "02":
			dates[1] = "Feb"
			break;
		case "03":
			dates[1] = "Mar"
			break;
		case "04":
			dates[1] = "Apr"
			break;
		case "05":
			dates[1] = "May"
			break;
		case "06":
			dates[1] = "Jun"
			break;
		case "07":
			dates[1] = "Jul"
			break;
		case "08":
			dates[1] = "Aug"
			break;
		case "09":
			dates[1] = "Sep"
			break;
		case "10":
			dates[1] = "Oct"
			break;
		case "11":
			dates[1] = "Nov"
			break;
		case "12":
			dates[1] = "Dec"
			break;
	}

	const day = dates[2].split("T")
	dates[2] = day[0]

	return `${dates[2]} ${dates[1]} ${dates[0]}`
}

export const getDateNumeric = (createdAt: string) => {
	const dates = createdAt.split('-')
	const day = dates[2].split("T")
	dates[2] = day[0]
	const year = dates[0].slice(2)
	return `${dates[2]}-${dates[1]}-${year}`
}

