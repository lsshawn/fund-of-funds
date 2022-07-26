<script>
	import { customers } from '$lib/stores/customer.ts';
	import { goto } from '$app/navigation';

	function view(id = '') {
		goto(`/customer/${id}`);
	}

	const headers = [
		{
			name: ''
		},
		{
			name: 'Name'
		},
		{
			name: 'Email'
		},
		{
			name: 'Equity ($)',
			class: 'text-right'
		},
		{
			name: 'Invested Amount ($)',
			class: 'text-right'
		},
		{
			name: 'Invested Funds'
		}
	];
</script>

<div>
	<div class="prose">
		<h1 class="mb-6">Customers</h1>
	</div>

	<button class="btn btn-primary mb-6">Add New Customer</button>
	<div class="overflow-x-auto">
		<table class="table w-full table-compact">
			<thead class="border-none bg-base-100">
				<tr>
					{#each headers as header}
						<th class={`${header.class || ''} normal-case`}>{header.name}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $customers as customer, i}
					<tr class="hover" on:click|preventDefault={() => view(customer._id)}>
						<th>{i + 1}</th>
						<td>{customer.firstName} {customer.lastName}</td>
						<td>{customer.email}</td>
						<td class="text-right">{customer.equity}</td>
						<td class="text-right">{customer.investedAmount}</td>
						<td>{customer.investedFunds}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
