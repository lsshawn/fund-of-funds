<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { funds } from '$lib/stores/fund.ts';
	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/fund/${obj ? obj._id : 'new'}`);
	}

	const headers = [
		{
			name: 'Name',
			value: 'name'
		},
		{
			name: 'Manager',
			value: 'manager'
		},
		{
			name: 'Inception Date',
			value: 'inceptionDate',
			formatDate: true,
			class: 'text-right'
		},
		{
			name: 'Created Date',
			value: 'createdDate',
			formatDate: true,
			class: 'text-right'
		},
		{
			name: 'Invested Amount',
			value: 'investedAmount',
			class: 'text-right'
		}
	];
</script>

<div>
	<div class="prose">
		<h1 class="mb-6">Funds</h1>
	</div>

	<button class="btn btn-primary mb-6" on:click={() => view()}>Add New Fund</button>

	<DataTable {headers} data={$funds} onRowClick={view} />
</div>
