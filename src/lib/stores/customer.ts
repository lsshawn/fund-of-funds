import { writable } from 'svelte/store'
import { queryAPI, buildArgs } from '$lib/utils'

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
              _id
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

function customerStore() {
	const { subscribe, set, update } = writable({})

	return {
		subscribe,
		reset: () => set({}),
		init: async (_id) => {
			const queryName = 'customerGet'

			const res = await queryAPI(
				`{
            ${queryName}(_id: "${_id}") {
              _id
              email
              firstName
              lastName
            }
        }`,
				queryName
			)

			if (res.error || res.errors) {
				throw new Error(res)
			}

			console.log('LS -> src/lib/stores/customer.ts:77 -> res.data: ', res.data)
			set({ ...res.data })
		},
		update: async (obj) => {
			const queryName = 'customerUpdate'

			const res = await queryAPI(
				`mutation {
            ${queryName}(${buildArgs({ obj }, true)}) {
              _id
              email
              firstName
              lastName
            }
        }`,
				queryName
			)

			if (res.error || res.errors) {
				throw new Error(res)
			}

			if (!res.data) return

			set({ ...res.data })
		}
	}
}

export const customers = customersStore()
export const customer = customerStore()
