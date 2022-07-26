export function unixToDate(unix: string) {
	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	return new Date(unix).toLocaleDateString('en-SG', options)
}
