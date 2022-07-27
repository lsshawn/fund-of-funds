<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import headers from '$lib/assets/json/TradeTableHeader.json';
	import { trades } from '$lib/stores/trade.ts';

	import { goto } from '$app/navigation';

	function view(obj) {
		goto(`/trade/${obj ? obj._id : 'new'}`);
	}
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
