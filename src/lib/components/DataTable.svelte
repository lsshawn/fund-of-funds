<script>
	import { unixToDate } from '$lib/utils';

	export let headers = [];
	export let data = [];
	export let onRowClick = () => {};

	function formatValue(obj, header) {
		let value;
		// nested object
		if (header.value.includes('.')) {
			const splitted = header.value.split('.');
			if (!splitted) return '-';
			let tempValue = obj;
			for (let i = 0; i < splitted.length; i++) {
				const key = splitted[i];

				if (!tempValue[key]) {
					tempValue = '-';
					break;
				}

				tempValue = tempValue[key];
			}
			value = tempValue;
		} else {
			value = obj[header.value];
		}

		if (!value) return '-';

		if (header.formatDate) {
			return unixToDate(value);
		}

		if (header.isNumber) {
			const options = {
				minimumFractionDigits: header.decimal || 0
			};
			return value.toLocaleString('en-US', options);
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

	{#if !data.length}
		<p class="text-center mt-6 text-base-400">No data</p>
	{/if}
</div>
