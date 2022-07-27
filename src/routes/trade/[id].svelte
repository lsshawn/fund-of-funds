<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';

	import { onMount } from 'svelte';
	import { trade } from '$lib/stores/trade.ts';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import { page } from '$app/stores';
	const id = $page.params.id;
	const isNew = id === 'new';

	let myForm;
	let tradeType, quantity, price, fund, customer, tradeDate, currency;

	onMount(async () => {
		await trade.init(id);

		tradeType = field('tradeType', $trade.tradeType, [required()]);
		quantity = field('quantity', $trade.quantity, [required()]);
		price = field('price', $trade.price, [required()]);
		fund = field('fund', $trade.fund, [required()]);
		customer = field('customer', $trade.customer, [required()]);
		tradeDate = field('tradeDate', $trade.tradeDate, [required()]);
		currency = field('currency', $trade.currency, [required()]);

		myForm = form(tradeType, quantity, price, fund, customer, tradeDate, currency);
	});

	const tradeTypes = ['buy', 'sell', 'deposit', 'withdrawal', 'adjustment', 'conversion'];

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

		const updated = {
			tradeType: $tradeType.value,
			quantity: $quantity.value,
			price: $price.value,
			fund: $fund.value,
			customer: $customer.value,
			tradeDate: $customer.value,
			currency: $currency.value
		};

		if (!isNew) updated['_id'] = $trade._id;

		Object.entries(updated).map(([key, value]) => {
			if (value === undefined || value === null) {
				errors.push(`${key} is required`);
			}
		});

		if (errors.length) {
			notifyError();
			return;
		}

		saving = true;
		const res = isNew ? await trade.create(updated) : await trade.update(updated);

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

<div class="prose flex">
	<BackButton />
	<h1 class="mb-0">{isNew ? 'Add new ' : 'Edit '} trade</h1>
</div>

{#await trade.init(id)}
	<p>Loading trade...</p>
{:then}
	{#if $myForm}
		<div>
			<!--
			<section id="form-ticker">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="ticker">
						<span class="label-text">Ticker *</span>
					</label>

					<select class="select select-bordered" bind:value={$ticker.value} id="ticker">
						{#each availableFunds as ticker}
							<option>{ticker}</option>
						{/each}
					</select>
				</div>
				{#if $myForm.hasError('ticker.required')}
					<div class="text-error">Ticker is required</div>
				{/if}
			</section>
-->

			<div id="form-type">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="tradeType">
						<span class="label-text">Trade Type *</span>
					</label>

					<select class="select select-bordered" bind:value={$tradeType.value} id="tradeType">
						{#each tradeTypes as type}
							<option>{type}</option>
						{/each}
					</select>
				</div>
				{#if $myForm.hasError('tradeType.required')}
					<div class="text-error">Type is required</div>
				{/if}
			</div>

			<div id="form-quantity">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="quantity">
						<span class="label-text">Quantity *</span>
					</label>

					<input
						type="number"
						step="0.00001"
						bind:value={$quantity.value}
						class="input input-bordered w-full"
						id="quantity"
					/>
				</div>

				{#if $myForm.hasError('quantity.required')}
					<div class="text-error">Quantity is required</div>
				{/if}
			</div>

			<div id="form-price">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="price">
						<span class="label-text">Price *</span>
					</label>

					<input
						type="number"
						step="0.00001"
						bind:value={$price.value}
						class="input input-bordered w-full"
						id="price"
					/>
				</div>

				{#if $myForm.hasError('price.required')}
					<div class="text-error">Price is required</div>
				{/if}
			</div>

			<div id="form-tradeDate">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="tradeDate">
						<span class="label-text">Trade Date *</span>
					</label>

					<input
						type="datetime-local"
						bind:value={$tradeDate.value}
						class="input input-bordered w-full"
						id="tradeDate"
					/>
				</div>

				{#if $myForm.hasError('tradeDate.required')}
					<div class="text-error">Trade Date is required</div>
				{/if}
			</div>
		</div>

		<SaveButton onClick={save} {errors} {saved} {hasError} {saving} />
		{#if !isNew}
			<!-- TODO: delete button -->
		{/if}
	{/if}
{/await}
