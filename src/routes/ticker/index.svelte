<script>
	import { unixToDate } from '$lib/utils';
	import { tickers } from '$lib/stores/ticker.ts';

	const headers = [
		{
			name: ''
		},
		{
			name: 'Ticker'
		},
		{
			name: 'Name'
		},
		{
			name: 'Last Price',
			class: 'text-right'
		},
		{
			name: 'Last Price Date',
			class: 'text-right'
		},
		{
			name: 'Created Date',
			class: 'text-right'
		}
	];
</script>

<div class="prose">
	<h1>Tickers</h1>

	<button class="btn btn-primary">Add new ticker</button>

	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead class="border-none bg-base-100">
				<tr>
					{#each headers as header}
						<th class={`${header.class || ''} normal-case`}>{header.name}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $tickers as ticker, i}
					<tr>
						<th>{i + 1}</th>
						<td>{ticker.ticker}</td>
						<td>{ticker.name}</td>
						<td class="text-right">{ticker.lastPrice}</td>
						<td class="text-right">{unixToDate(ticker.lastPriceTime)}</td>
						<td class="text-right">{unixToDate(ticker.createdDate)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
