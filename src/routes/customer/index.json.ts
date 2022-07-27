import { queryAPI } from '$lib/utils'

export async function GET() {
	const responseSchema = `
_id
firstName
lastName
email
`
	const queryName = 'customerGetMany'

	const res = await queryAPI(
		`{
            ${queryName} {
              ${responseSchema}
            }
        }`,
		queryName
	)
	return {
		status: 200,
		body: { customers: res.data }
	}
}
