import { writable } from 'svelte/store'
import { queryAPI, buildArgs } from '$lib/utils'

const responseSchema = `
_id
createdDate
ticker
name
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
			const queryName = 'fundGetMany'

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

function fundStore() {
	const { subscribe, set, update } = writable({})

	return {
		subscribe,
		reset: () => set({}),
		init: async (_id) => {
			if (!_id || _id === 'new') {
				set({})
				return
			}

			const queryName = 'fundGet'

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
			const queryName = 'fundUpdate'

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
			const queryName = 'fundCreate'

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

export const funds = fundsStore()
export const fund = fundStore()
