<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import Check from '$lib/assets/icons/Check.svelte';

	import { customer } from '$lib/stores/customer.ts';

	import { page } from '$app/stores';
	const customerId = $page.params.id;

	import { form, field } from 'svelte-forms';
	import { required, email } from 'svelte-forms/validators';

	const firstName = field('firstName', $customer.firstName, [required()]);
	const lastName = field('lastName', $customer ? $customer.lastName : '', []);
	const customerEmail = field('customerEmail', $customer ? $customer.email : '', [email()]);
	const customerForm = form(firstName, lastName, customerEmail);

	$: saving = false;
	$: saved = false;
	async function save() {
		const valid = $customerForm.valid;
		if (!valid) return;

		saving = true;

		const updatedCustomer = {
			_id: $customer._id,
			firstName: $firstName.value,
			lastName: $lastName.value,
			email: $customerEmail.value
		};

		await customer.update(updatedCustomer);

		saving = false;
		saved = true;
		setTimeout(() => {
			saved = false;
		}, 1000);
	}
</script>

<div>
	<div class="prose flex">
		<BackButton />
		<h1 class="mb-0">{customerId !== 'new' ? 'Edit customer' : 'Add new customer'}</h1>
	</div>

	{#await customer.init(customerId)}
		<p>Loading customer...</p>
	{:then}
		{$customer.firstName}
		<div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">First name *</span>
				</label>
				<input
					type="text"
					bind:value={$firstName.value}
					class="input input-bordered w-full"
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
				<input type="text" bind:value={$lastName.value} class="input input-bordered w-full" />
			</div>
		</div>

		<div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Email *</span>
				</label>
				<input type="text" bind:value={$customerEmail.value} class="input input-bordered w-full" />
			</div>

			{#if $customerForm.hasError('customerEmail.required')}
				<div class="text-error">Email is required</div>
			{/if}
			{#if $customerForm.hasError('customerEmail.not_an_email')}
				<div class="text-error">Email invalid</div>
			{/if}
		</div>

		<section class="mt-6">
			<div class="text-sm">* required fields</div>

			<button
				class="btn btn-primary mt-6"
				on:click={save}
				class:loading={saving}
				class:btn-success={saved}
			>
				{#if saved}
					<Check />
				{/if}

				{saved ? 'Saved' : 'Save'}
			</button>
		</section>
	{:catch error}
		<p class="text-error">Error in loading customer</p>
	{/await}
</div>
