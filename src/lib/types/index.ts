export interface GraphQuery {
	statusCode: number
	data: any | any[]
	error?: string
	errors?: [string]
}
