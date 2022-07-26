<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { customers } from '$lib/stores/customer.ts';
	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/customer/${obj ? obj._id : 'new'}`);
	}

	const headers = [
		{
			name: 'First Name',
			value: 'firstName'
		},
		{
			name: 'Last Name',
			value: 'lastName'
		},
		{
			name: 'Email',
			value: 'email'
		},
		{
			name: 'Total Deposits ($)',
			value: 'deposit',
			class: 'text-right'
		},
		{
			name: 'Invested Funds',
			value: 'investedFunds'
		}
	];
</script>

<div>
	<div class="prose">
		<h1 class="mb-6">Customers</h1>
	</div>

	{#await customers.init()}
		<p>Loading customers...</p>
	{:then}
		<button class="btn btn-primary mb-6" on:click={() => view()}>Add New Customer</button>

		<DataTable {headers} data={$customers} onRowClick={view} />
	{/await}
</div>
