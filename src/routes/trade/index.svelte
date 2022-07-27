<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { trades } from '$lib/stores/trade.ts';
	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/trade/${obj ? obj._id : 'new'}`);
	}

	const headers = [
		{
			name: 'Created date',
			value: 'createdDate',
			formatDate: true
		},
		{
			name: 'Fund',
			value: 'fund'
		},
		{
			name: 'Type',
			value: 'tradeType'
		},
		{
			name: 'Currency',
			value: 'currency'
		},
		{
			name: 'Quantity',
			value: 'quantity',
			class: 'text-right',
			isNumber: true
		},
		{
			name: 'Price',
			value: 'price',
			class: 'text-right',
			isNumber: true
		},
		{
			name: 'Value ($)',
			value: 'value',
			class: 'text-right',
			isNumber: true
		},
		{
			name: 'Trade Date',
			value: 'tradeDate',
			class: 'text-right',
			formatDate: true
		},
		{
			name: 'Customer',
			value: 'customer'
		}
	];
</script>

<div>
	<div class="prose">
		<h1 class="mb-6">Trades</h1>
	</div>

	{#await trades.init()}
		<p>Loading trades...</p>
	{:then}
		<button class="btn btn-primary mb-6" on:click={() => view()}>Add New Trade</button>

		<DataTable {headers} data={$trades} onRowClick={view} />
	{/await}
</div>
