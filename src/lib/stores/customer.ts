import { writable } from 'svelte/store'

const db = [
	{
		_id: '1',
		firstName: 'John',
		lastName: 'Doe',
		createdDate: 1577808000000,
		email: 'john@doe.com',
		equity: 1245,
		investedAmount: 1000,
		investedFunds: [1]
	},
	{
		_id: '2',
		firstName: 'Soon Lai',
		lastName: 'Mah',
		createdDate: 1577808000000,
		email: 'soonlai@abc.com',
		equity: 21305,
		investedAmount: 10000,
		investedFunds: [1]
	}
]

function createCustomers() {
	const { subscribe, set, update } = writable(db)

	return {
		subscribe,
		add: (newObj) => update((storeValue) => [...storeValue, newObj]),
		reset: () => set([])
	}
}

export const customers = createCustomers()
