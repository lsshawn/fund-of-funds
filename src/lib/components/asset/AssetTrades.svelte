<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { assetTrades } from '$lib/stores/trade.ts';
	// import { trades } from '$lib/stores/trade.ts';
	import { goto } from '$app/navigation';

	import headers from '$lib/assets/json/TradeTableHeader.json';

	function view(obj) {
		goto(`/trade/${obj ? obj._id : 'new'}`);
	}

	export let assetId;
</script>

<div>
	{#await assetTrades.init(assetId)}
		<p>Loading fund trades...</p>
	{:then}
		<DataTable {headers} data={$assetTrades} onRowClick={view} />
	{/await}
</div>
