import { writable } from 'svelte/store'

function createFunds() {
	const { subscribe, set, update } = writable([
		{
			_id: 1,
			name: 'Market Weight Index',
			manager: 'ABC Ventures Capital'
		},
		{
			_id: 2,
			name: 'Stable',
			manager: 'ABC Ventures Capital'
		}
	])

	return {
		subscribe,
		add: (newFund) => update((storeValue) => [...storeValue, newFund]),
		reset: () => set([])
	}
}

export const tickers = createFunds()
