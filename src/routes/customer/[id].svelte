<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';

	import { onMount } from 'svelte';
	import { customer } from '$lib/stores/customer.ts';
	import { form, field } from 'svelte-forms';
	import { required, email } from 'svelte-forms/validators';

	import { page } from '$app/stores';
	const id = $page.params.id;
	const isNew = id === 'new';

	let myForm;
	let firstName, lastName, customerEmail;
	onMount(async () => {
		await customer.init(id);

		firstName = field('firstName', $customer.firstName, [required()]);
		lastName = field('lastName', $customer.lastName, []);
		customerEmail = field('customerEmail', $customer.email, [required(), email()]);
		myForm = form(firstName, lastName, customerEmail);
	});

	$: saving = false;
	$: saved = false;
	$: hasError = false;
	$: errors = [];
	async function save() {
		function notifyError() {
			hasError = true;
			setTimeout(() => {
				hasError = false;
			}, 1000);
		}

		hasError = false;
		errors = [];

		const valid = $myForm.valid;
		if (!valid) {
			notifyError();
			return;
		}

		const updatedCustomer = {
			firstName: $firstName.value,
			lastName: $lastName.value,
			email: $customerEmail.value
		};

		if (!isNew) updatedCustomer['_id'] = $customer._id;

		const requiredFields = ['firstName', 'email'];
		requiredFields.map((field) => {
			if (!updatedCustomer[field]) {
				errors.push(`${field} is required`);
			}
		});

		if (errors.length) {
			notifyError();
			return;
		}

		saving = true;
		const res = isNew
			? await customer.create(updatedCustomer)
			: await customer.update(updatedCustomer);

		saving = false;
		if (res.statusCode === 200) {
			saved = true;
			setTimeout(() => {
				saved = false;
			}, 1000);
		} else {
			errors = res.errors;
			notifyError();
		}
	}
</script>

<div>
	<div class="prose flex">
		<BackButton />
		<h1 class="mb-0">{isNew ? 'Add new ' : 'Edit '} customer</h1>
	</div>

	{#await customer.init(id)}
		<p>Loading customer...</p>
	{:then}
		{#if $myForm}
			<div>
				<div class="form-control w-full max-w-xs">
					<label class="label" for="firstName">
						<span class="label-text">First name *</span>
					</label>
					<input
						type="text"
						bind:value={$firstName.value}
						class="input input-bordered w-full"
						class:input-error={$myForm.hasError('firstName.required')}
						id="firstName"
					/>
				</div>
				{#if $myForm.hasError('firstName.required')}
					<div class="text-error">First name is required</div>
				{/if}
			</div>

			<div>
				<div class="form-control w-full max-w-xs">
					<label class="label" for="lastName">
						<span class="label-text">Last name</span>
					</label>
					<input
						type="text"
						bind:value={$lastName.value}
						class="input input-bordered w-full"
						id="lastName"
					/>
				</div>
			</div>

			<div>
				<div class="form-control w-full max-w-xs">
					<label class="label" for="email">
						<span class="label-text">Email *</span>
					</label>
					<input
						type="text"
						bind:value={$customerEmail.value}
						class="input input-bordered w-full"
						id="email"
					/>
				</div>

				{#if $myForm.hasError('customerEmail.required')}
					<div class="text-error">Email is required</div>
				{/if}
				{#if $myForm.hasError('customerEmail.not_an_email')}
					<div class="text-error">Email invalid</div>
				{/if}
			</div>

			<SaveButton onClick={save} {errors} {saved} {hasError} {saving} />
		{/if}
	{:catch error}
		<p class="text-error">Error in loading customer {JSON.stringify(error)}</p>
	{/await}
</div>
