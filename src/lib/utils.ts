import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export function unixToDate(unix: string) {
	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	return new Date(unix).toLocaleDateString('en-SG', options)
}

// Wrapper to call GraphAPI
export const queryAPI = async (query: string, operationName: string): Promise<GraphQuery> => {
	// TODO: Pass in API token
	const header = {
		headers: {
			Authorization: `Bearer `,
			'Content-Type': 'application/json'
		}
	}

	const json: GraphQuery = {
		statusCode: 400,
		data: {}
	}

	try {
		const res = await axios.post(API_URL, { query }, header)
		json.statusCode = res.status
		json.data = res.data.data[operationName]
		if (res.data.errors) {
			json.statusCode = 422
			json.errors = res.data.errors.map((obj) => obj.message)
		}
	} catch (err) {
		console.log(`Error in Graph API: ${err}`)
		json.data = err.message
		json.error = err
	}
	return json
}

// for GraphQL. JSON.stringify() doesn't work because of double quotes in key
// set withoutSurroundingBrackets to 'true' for building GraphQL query
export const buildArgs = (json: any, withoutSurroundingBrackets?: boolean) => {
	let str = JSON.stringify(json).replace(/"(\w+)"\s*:/g, '$1:')
	if (withoutSurroundingBrackets) str = str.slice(1, -1)
	return str
}
