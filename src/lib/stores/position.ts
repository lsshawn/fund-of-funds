import { writable } from 'svelte/store'
import { queryAPI } from '$lib/utils'

const responseSchema = `
_id
quantity
createdDate
updatedDate
asset
customer
marketValue
`

function customerPositionsStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async (customerId: string) => {
			if (!customerId) return

			const queryName = 'positionGetManyByCustomer'

			const res = await queryAPI(
				`{
            ${queryName}(customer: "${customerId}") {
              ${responseSchema}
            }
        }`,
				queryName
			)

			if (res.error || res.errors) {
				throw new Error(res)
			}

			set(res.data)
		}
	}
}

export const customerPositions = customerPositionsStore()
