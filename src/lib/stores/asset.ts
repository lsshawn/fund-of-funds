import { writable } from 'svelte/store'
import { queryAPI, buildArgs } from '$lib/utils'

const responseSchema = `
_id
createdDate
ticker
name
lastPrice
description
manager
inceptionDate
baseCurrency
managementFee
performanceFee
minInvestment
minAdditionalInvestment
investedAmount
maxInvestableAmount
`

function fundsStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		init: async () => {
			const queryName = 'assetGetManyFunds'

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

function assetStore() {
	const { subscribe, set, update } = writable({})

	return {
		subscribe,
		reset: () => set({}),
		init: async (_id) => {
			if (!_id || _id === 'new') {
				set({})
				return
			}

			const queryName = 'assetGet'

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
			const queryName = 'assetUpdate'

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
			const queryName = 'assetCreate'

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

function assetAutocompleteStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		reset: () => set([]),
		search: async (ticker, type = '') => {
			const queryName = 'assetAutocomplete'

			const res = await queryAPI(
				`{
            ${queryName}(ticker: "${ticker}", type: "${type}") {
              _id ticker
            }
        }`,
				queryName
			)
			set(res.data)
		}
	}
}

export const funds = fundsStore()
export const asset = assetStore()
export const assetAutocomplete = assetAutocompleteStore()
