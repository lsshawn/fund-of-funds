<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { funds } from '$lib/stores/fund.ts';
	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/fund/${obj ? obj._id : 'new'}`);
	}

	const headers = [
		{
			name: 'Ticker',
			value: 'ticker'
		},
		{
			name: 'Name',
			value: 'name'
		},
		{
			name: 'Manager',
			value: 'manager'
		},
		{
			name: 'Management Fee %',
			value: 'managementFee',
			class: 'text-right',
			isNumber: true,
			decimal: 2
		},
		{
			name: 'Performance Fee %',
			value: 'performanceFee',
			class: 'text-right',
			isNumber: true,
			decimal: 2
		},
		{
			name: 'Invested Amount ($)',
			value: 'investedAmount',
			class: 'text-right',
			isNumber: true
		},
		{
			name: 'Max Investable Amount ($)',
			value: 'maxInvestableAmount',
			class: 'text-right',
			isNumber: true
		},
		{
			name: 'Created Date',
			value: 'createdDate',
			formatDate: true,
			class: 'text-right'
		}
	];
</script>

<div>
	<div class="prose">
		<h1 class="mb-6">Funds</h1>
	</div>
	{#await funds.init()}
		<p>Loading funds...</p>
	{:then}
		<button class="btn btn-primary mb-6" on:click={() => view()}>Add New Fund</button>

		<DataTable {headers} data={$funds} onRowClick={view} />
	{/await}
</div>
