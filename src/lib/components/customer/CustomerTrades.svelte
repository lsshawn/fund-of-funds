<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { customerTrades } from '$lib/stores/trade.ts';
	// import { trades } from '$lib/stores/trade.ts';
	import { goto } from '$app/navigation';

	import headers from '$lib/assets/json/TradeTableHeader.json';

	function view(obj) {
		goto(`/trade/${obj ? obj._id : 'new'}`);
	}

	export let customerId;
</script>

<div>
	{#await customerTrades.init(customerId)}
		<p>Loading customer trades...</p>
	{:then}
		<DataTable {headers} data={$customerTrades} onRowClick={view} />
	{/await}
</div>
