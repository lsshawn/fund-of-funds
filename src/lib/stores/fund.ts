import { writable } from 'svelte/store'

function createFunds() {
	const { subscribe, set, update } = writable([
		{
			_id: 1,
			name: 'Market Weight Index',
			manager: 'ABC Ventures Capital',
			createdDate: 1577808000000,
			investedAmount: 10000
		},
		{
			_id: 2,
			name: 'Stable',
			manager: 'ABC Ventures Capital',
			createdDate: 1577808000000
		}
	])

	return {
		subscribe,
		add: (newFund) => update((storeValue) => [...storeValue, newFund]),
		reset: () => set([])
	}
}

export const funds = createFunds()
