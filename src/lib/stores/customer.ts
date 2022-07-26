import { writable } from 'svelte/store'
import { queryAPI } from '$lib/utils'

const db = [
	{
		_id: '1',
		firstName: 'John',
		lastName: 'Doe',
		createdDate: 1577808000000,
		email: 'john@doe.com',
		equity: 1245,
		deposit: 1000
	},
	{
		_id: '2',
		firstName: 'Soon Lai',
		lastName: 'Mah',
		createdDate: 1577808000000,
		email: 'soonlai@abc.com',
		equity: 21305,
		deposit: 10000
	}
]

function customersStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async () => {
			const queryName = 'customerGetMany'

			const res = await queryAPI(
				`{
            ${queryName} {
              email
              firstName
            }
        }`,
				queryName
			)

			set(res.data)
		}
	}
}

function customerStore() {
	const { subscribe, set, update } = writable({})

	return {
		subscribe,
		reset: () => set([]),
		init: async (id) => {
			console.log('LS -> src/lib/stores/customer.ts:55 -> id: ', id)
			const queryName = 'customerGet'

			const res = await queryAPI(
				`{
            ${queryName} {
              email
              firstName
              lastName
            }
        }`,
				queryName
			)

			set(res.data)
		}
	}
}

export const customers = customersStore()
