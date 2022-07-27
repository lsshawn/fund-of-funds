<script>
	import DataTable from '$lib/components/DataTable.svelte';
	import headers from '$lib/assets/json/CustomerTableHeader.json';

	import { customers } from '$lib/stores/customer.ts';
	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/customer/${obj ? obj._id : 'new'}`);
	}
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
