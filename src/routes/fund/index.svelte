<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import headers from '$lib/assets/json/FundTableHeader.json';
	import { funds } from '$lib/stores/asset.ts';
	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/fund/${obj ? obj._id : 'new'}`);
	}
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
