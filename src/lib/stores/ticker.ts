import { writable } from 'svelte/store'

function createTickers() {
	const { subscribe, set, update } = writable([
		{
			name: 'Bitcoin',
			ticker: 'BTC',
			lastPrice: 34000.5,
			lastPriceTime: 1658823331053,
			createdDate: 1577808000000
		},
		{
			name: 'Ethereum',
			ticker: 'ETH',
			lastPrice: 5000,
			lastPriceTime: 1658823331053,
			createdDate: 1577808000000
		},
		{
			name: 'USDT',
			ticker: 'USDT',
			lastPrice: 1,
			lastPriceTime: 1658823331053,
			createdDate: 1577808000000
		},
		{
			name: 'USDC',
			ticker: 'USDC',
			lastPrice: 1,
			lastPriceTime: 1658823331053,
			createdDate: 1577808000000
		},
		{
			name: 'US Dollar',
			ticker: 'USD',
			lastPrice: 1,
			lastPriceTime: 1658823331053,
			createdDate: 1577808000000
		}
	])

	return {
		subscribe,
		add: (newTicker) => update((storeValue) => [...storeValue, newTicker]),
		reset: () => set([])
	}
}

export const tickers = createTickers()
