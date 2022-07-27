<script context="module">
	// @ts-ignore
	export const load = async ({ url, fetch }) => {
		const page = url.searchParams.get('page') || 1;
		const res = await fetch('/customer.json');
		const { customers } = await res.json();
		return {
			props: { customers }
		};
	};
</script>

<script>
	export let customers;

	import DataTable from '$lib/components/DataTable.svelte';
	import headers from '$lib/assets/json/CustomerTableHeader.json';

	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/customer/${obj ? obj._id : 'new'}`);
	}
</script>

<div>
	<div class="prose">
		<h1 class="mb-6">Customers</h1>
	</div>

	<button class="btn btn-primary mb-6" on:click={() => view()}>Add New Customer</button>

	<DataTable {headers} data={customers} onRowClick={view} />
</div>
