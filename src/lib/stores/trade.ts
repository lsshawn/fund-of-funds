import { writable } from 'svelte/store'
import { queryAPI, buildArgs } from '$lib/utils'

const responseSchema = `
_id
tradeType
currency
quantity
price
value
asset
createdBy
customer
createdDate
tradeDate
`

function tradesStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async () => {
			const queryName = 'tradeGetMany'

			const res = await queryAPI(
				`{
            ${queryName} {${responseSchema}}
        }`,
				queryName
			)

			set(res.data)
		}
	}
}

function tradeStore() {
	const { subscribe, set, update } = writable({})

	return {
		subscribe,
		reset: () => set({}),
		init: async (_id) => {
			if (!_id || _id === 'new') {
				set({})
				return
			}

			const queryName = 'tradeGet'

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
			const queryName = 'tradeUpdate'

			const res = await queryAPI(
				`mutation {
            ${queryName}(${buildArgs({ obj }, true)}) {
              ${responseSchema}
          }
        }`,
				queryName
			)

			if (res.error || res.errors) {
				return res
			}

			set({ ...res.data })

			return res
		},
		create: async (obj) => {
			const queryName = 'tradeCreate'

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

function assetTradesStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async (assetId) => {
			if (!assetId) return

			const queryName = 'tradeGetManyByAsset'

			const res = await queryAPI(
				`{
            ${queryName}(asset: "${assetId}") {
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

function customerTradesStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async (customerId) => {
			if (!customerId) return

			const queryName = 'tradeGetManyByCustomer'

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

export const trades = tradesStore()
export const trade = tradeStore()
export const assetTrades = assetTradesStore()
export const customerTrades = customerTradesStore()
