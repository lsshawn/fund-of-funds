<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { trade } from '$lib/stores/trade.ts';
	import { assetAutocomplete } from '$lib/stores/asset.ts';
	import { customerAutocomplete } from '$lib/stores/customer.ts';

	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import { page } from '$app/stores';
	const id = $page.params.id;
	const isNew = id === 'new';

	let myForm;
	let tradeType, quantity, price, asset, customer, tradeDate, currency;

	onMount(async () => {
		await trade.init(id);

		tradeType = field('tradeType', $trade.tradeType, [required()]);
		quantity = field('quantity', $trade.quantity, [required()]);
		price = field('price', $trade.price, [required()]);
		asset = field('asset', $trade.asset ? $trade.asset._id : undefined, [required()]);
		customer = field('customer', $trade.customer ? $trade.customer._id : undefined, [required()]);
		tradeDate = field('tradeDate', $trade.tradeDate, [required()]);
		currency = field('currency', $trade.currency, [required()]);

		myForm = form(tradeType, quantity, price, asset, customer, tradeDate, currency);
	});

	const tradeTypes = ['buy', 'sell', 'deposit', 'withdrawal', 'adjustment', 'conversion'];
	const currencies = ['USD', 'BTC', 'EUR', 'MYR', 'SGD'];

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
			asset: $asset.value,
			customer: $customer.value,
			tradeDate: $tradeDate.value,
			currency: $currency.value
		};

		if (!isNew) updated['_id'] = $trade._id;

		Object.entries(updated).map(([key, value]) => {
			console.log('LS -> src/routes/trade/[id].svelte:72 -> key: ', key);
			console.log('LS -> src/routes/trade/[id].svelte:72 -> value: ', value);
			if (value === undefined || value === null) {
				errors.push(`${key} is required`);
			}
		});

		// TODO: Validate Fund is required if tradeType is buy, sell, or fee.

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
				if (isNew) goto('/trade');
			}, 1000);
		} else {
			errors = res.errors;
			notifyError();
		}
	}

	// debounce search for fund ticker

	let autocompleteAssetTimer;
	const autocompleteAsset = (ticker) => {
		clearTimeout(autocompleteAssetTimer);
		autocompleteAssetTimer = setTimeout(async () => {
			await assetAutocomplete.search(ticker);
		}, 500);
	};

	// debounce search for customer firstName

	let autocompleteCustomerTimer;
	const autocompleteCustomer = (firstName) => {
		clearTimeout(autocompleteCustomerTimer);
		autocompleteCustomerTimer = setTimeout(async () => {
			await customerAutocomplete.search(firstName);
		}, 500);
	};
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
			<div id="form-customer">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="customer">
						<span class="label-text">Customer *</span>
					</label>

					<input
						type="text"
						bind:value={$customer.value}
						class="input input-bordered w-full"
						id="customer"
						list="customers"
						on:input={(e) => autocompleteCustomer(e.target.value)}
					/>
					<datalist id="customers">
						{#each $customerAutocomplete as customer}
							<option value={customer._id}>{customer.firstName} ({customer.email})</option>
						{/each}
					</datalist>
				</div>
			</div>

			<div id="form-tradeType">
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

			<div id="form-asset">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="asset">
						<span class="label-text">Asset</span>
					</label>

					<input
						type="text"
						bind:value={$asset.value}
						class="input input-bordered w-full"
						id="asset"
						list="tickers"
						on:input={(e) => autocompleteAsset(e.target.value)}
					/>
					<datalist id="tickers">
						{#each $assetAutocomplete as asset}
							<option value={asset._id}>{asset.ticker}</option>
						{/each}
					</datalist>
				</div>
			</div>

			<!-- TODO: autofill based on selected asset -->
			<div id="form-currency">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="currency">
						<span class="label-text">Currency *</span>
					</label>

					<select class="select select-bordered" bind:value={$currency.value} id="tradeType">
						{#each currencies as currency}
							<option>{currency}</option>
						{/each}
					</select>
				</div>
				{#if $myForm.hasError('currency.required')}
					<div class="text-error">Curreny is required</div>
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

		{#if isNew}
			<SaveButton onClick={save} {errors} {saved} {hasError} {saving} />
		{/if}
		<!-- TODO: delete button -->
	{/if}
{/await}
