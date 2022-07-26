<script>
	import { unixToDate } from '$lib/utils';

	export let headers = [];
	export let data = [];
	export let onRowClick = () => {};

	function formatValue(obj, header) {
		const value = obj[header.value];
		if (!value) return '-';

		if (header.formatDate) {
			return unixToDate(value);
		}

		return value;
	}
</script>

<div class="overflow-x-auto">
	<table class="table w-full table-compact">
		<thead class="border-none bg-base-100">
			<tr>
				<th />
				{#each headers as header}
					<th class={`${header.class || ''} normal-case`}>{header.name}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as obj, i}
				<tr class="hover" on:click|preventDefault={() => onRowClick(obj)}>
					<th>{i + 1}</th>
					{#each headers as header}
						<td class={header.class || ''}>{formatValue(obj, header)} </td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
