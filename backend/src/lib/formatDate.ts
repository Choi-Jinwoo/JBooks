const formatDate = (date: Date): string => {
	return `${date.getFullYear()}-${(zeroFill(date.getMonth() + 1))}-${zeroFill(date.getDate())}`;
}

const zeroFill = (data: number): string => {
	if (data < 10) {
		return `0${data}`;
	} else {
		return data.toString();
	}
}

export default formatDate;