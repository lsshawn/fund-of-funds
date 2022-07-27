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
			if (!_id || _id === 'new') {
				set({
					email: '',
					firstName: '',
					lastName: ''
				})
				return
			}

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

			if (res.statusCode === 200 && res.data) {
				set({ ...res.data })
			}

			return res
		},
		create: async (obj) => {
			const queryName = 'customerCreate'

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

			if (res.statusCode === 200 && res.data) {
				set({ ...res.data })
			}

			return res
		}
	}
}

export const customers = customersStore()
export const customer = customerStore()
