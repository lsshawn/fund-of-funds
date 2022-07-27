<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { customerPositions } from '$lib/stores/position.ts';

	import headers from '$lib/assets/json/PositionTableHeader.json';

	export let customerId;
</script>

<div>
	{#await customerPositions.init(customerId)}
		<p>Loading customer positions...</p>
	{:then}
		<DataTable {headers} data={$customerPositions} />
	{/await}
</div>
