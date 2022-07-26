<script context="module">
	const db = [
		{
			_id: '1',
			firstName: 'John',
			lastName: 'Doe',
			createdDate: 1577808000000,
			email: 'john@doe.com',
			equity: 1245,
			investedAmount: 1000,
			investedFunds: [1]
		},
		{
			_id: '2',
			firstName: 'Soon Lai',
			lastName: 'Mah',
			createdDate: 1577808000000,
			email: 'soonlai@abc.com',
			equity: 21305,
			investedAmount: 10000,
			investedFunds: [1]
		}
	];

	export const load = async ({ params }) => {
		const id = params.id;
		const customer = db.filter((obj) => obj._id === id)[0];
		return { props: { customer } };
	};
</script>

<script>
	import BackButton from '$lib/components/BackButton.svelte';

	export let customer;

	const openPositions = [
		{
			_id: '1',
			fund: '1',
			quantity: 700
		},
		{
			_id: '2',
			fund: '2',
			quantity: 300
		}
	];

	import { form, field } from 'svelte-forms';
	import { required, email } from 'svelte-forms/validators';

	const firstName = field('firstName', customer.firstName, [required()]);
	const lastName = field('lastName', customer.lastName, []);
	const customerEmail = field('customerEmail', customer.email, [email()]);
	const customerForm = form(firstName, lastName, customerEmail);

	function save() {
		const valid = $customerForm.valid;
		if (!valid) return;

		customer = {
			...customer,
			firstName: $firstName.value,
			lastName: $lastName.value,
			email: $customerEmail.value
		};
	}
</script>

<div>
	<div class="prose flex">
		<BackButton />
		<h1 class="mb-0">Customer name</h1>
	</div>

	<div>
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">First name *</span>
			</label>
			<input
				type="text"
				bind:value={$firstName.value}
				class="input input-bordered w-full"
				placeholder="Elon"
				class:input-error={$customerForm.hasError('firstName.required')}
			/>
		</div>
		{#if $customerForm.hasError('firstName.required')}
			<div class="text-error">First name is required</div>
		{/if}
	</div>

	<div>
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Last name</span>
			</label>
			<input
				type="text"
				bind:value={$lastName.value}
				class="input input-bordered w-full"
				placeholder="Musk"
			/>
		</div>
	</div>

	<div>
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Email *</span>
			</label>
			<input
				type="text"
				bind:value={$customerEmail.value}
				class="input input-bordered w-full"
				placeholder="elonmusk@proton.io"
			/>
		</div>

		{#if $customerForm.hasError('customerEmail.required')}
			<div class="text-error">Email is required</div>
		{/if}
		{#if $customerForm.hasError('customerEmail.not_an_email')}
			<div class="text-error">Email invalid</div>
		{/if}
	</div>

	<section class="mt-6">
		<div>* required fields</div>

		<button class="btn btn-primary" on:click={save}>Save</button>
	</section>
</div>
