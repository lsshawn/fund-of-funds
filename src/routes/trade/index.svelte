<script>
	import { trades } from '$lib/stores/trade.ts';
	import DataTable from '$lib/components/DataTable.svelte';

	import { goto } from '$app/navigation';
	function view(obj) {
		goto(`/trade/${obj._id}`);
	}

	const headers = [
		{
			name: 'Created date',
			value: 'createdDate',
			formatDate: true
		},
		{
			name: 'Ticker',
			value: 'ticker'
		},
		{
			name: 'Type',
			value: 'type'
		},
		{
			name: 'Quantity',
			value: 'quantity',
			class: 'text-right'
		},
		{
			name: 'Value ($)',
			value: 'value',
			class: 'text-right'
		},
		{
			name: 'Fund',
			value: 'fund'
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

	<button class="btn btn-primary mb-6">Add New Trade</button>

	<div>Last 30 trades</div>

	<DataTable {headers} data={$trades} onRowClick={view} />
</div>
