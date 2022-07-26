import { writable } from 'svelte/store'

const db = [
	{
		_id: '0',
		type: 'deposit',
		price: 30000,
		value: 300,
		fund: '1',
		customer: '2',
		tradeDate: 1577808000000,
		createdDate: 1577808000000,
		createdBy: '1'
	},
	{
		_id: '1',
		fund: '1',
		type: 'buy',
		quantity: 1000,
		price: 10,
		value: 10000,
		customer: '2',
		tradeDate: 1577808000000,
		createdDate: 1577808000000,
		createdBy: '1'
	},
	{
		_id: '2',
		fund: '1',
		type: 'buy',
		quantity: 0.01,
		price: 30000,
		customer: '2',
		tradeDate: 1577808000000,
		createdDate: 1577808000000,
		createdBy: '1'
	}
]

function createTrades() {
	const { subscribe, set, update } = writable(db)

	return {
		subscribe,
		add: (newObj) => update((storeValue) => [...storeValue, newObj]),
		reset: () => set([])
	}
}

export const trades = createTrades()
