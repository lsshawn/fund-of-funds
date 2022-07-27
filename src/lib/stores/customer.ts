import { writable } from 'svelte/store'
import { queryAPI, buildArgs } from '$lib/utils'

const responseSchema = `
_id
firstName
lastName
email
`

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
              ${responseSchema}
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
				set({})
				return
			}

			const queryName = 'customerGet'

			const res = await queryAPI(
				`{
            ${queryName}(_id: "${_id}") {
              ${responseSchema}
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
              ${responseSchema}
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

function customerAutocompleteStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		search: async (firstName) => {
			const queryName = 'customerAutocomplete'

			const res = await queryAPI(
				`{
            ${queryName}(firstName: "${firstName}") {
              _id firstName email
            }
        }`,
				queryName
			)
			set(res.data)
		}
	}
}

export const customers = customersStore()
export const customer = customerStore()
export const customerAutocomplete = customerAutocompleteStore()
