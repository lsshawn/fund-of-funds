import { writable } from 'svelte/store'
import { queryAPI, buildArgs } from '$lib/utils'

function fundsStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async () => {
			const queryName = 'fundGetMany'

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

function fundStore() {
	const { subscribe, set, update } = writable({})

	return {
		subscribe,
		reset: () => set({}),
		init: async (_id) => {
			const queryName = 'fundGet'

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
			const queryName = 'fundUpdate'

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

export const funds = fundsStore()
export const fund = fundStore()
