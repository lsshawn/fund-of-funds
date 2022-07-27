<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';

	import { onMount } from 'svelte';
	import { fund } from '$lib/stores/fund.ts';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import { page } from '$app/stores';
	const id = $page.params.id;
	const isNew = id === 'new';

	let myForm;
	let ticker,
		name,
		description,
		manager,
		inceptionDate,
		baseCurrency,
		managementFee,
		performanceFee,
		minInvestment,
		minAdditionalInvestment,
		maxInvestableAmount;

	onMount(async () => {
		await fund.init(id);

		ticker = field('ticker', $fund.ticker, [required()]);
		name = field('name', $fund.name, []);
		description = field('description', $fund.description, []);
		manager = field('manager', $fund.manager, []);
		inceptionDate = field('inceptionDate', $fund.inceptionDate, []);
		baseCurrency = field('baseCurrency', $fund.baseCurrency, []);
		managementFee = field('managementFee', $fund.managementFee, []);
		performanceFee = field('performanceFee', $fund.performanceFee, []);
		minInvestment = field('minInvestment', $fund.minInvestment, []);
		minAdditionalInvestment = field('minAdditionalInvestment', $fund.minAdditionalInvestment, []);
		maxInvestableAmount = field('maxInvestableAmount', $fund.maxInvestableAmount, []);
		myForm = form(
			ticker,
			name,
			description,
			inceptionDate,
			baseCurrency,
			managementFee,
			performanceFee,
			minInvestment,
			minAdditionalInvestment,
			maxInvestableAmount
		);
	});

	const tabs = ['Fund details', 'Prices', 'Trades'];
	$: activeTab = tabs[0];

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

		const updatedFund = {
			ticker: $ticker.value,
			name: $name.value,
			description: $description.value,
			manager: $manager.value,
			inceptionDate: $inceptionDate.value,
			baseCurrency: $baseCurrency.value,
			managementFee: $managementFee.value,
			performanceFee: $performanceFee.value,
			minInvestment: $minInvestment.value,
			minAdditionalInvestment: $minAdditionalInvestment.value,
			maxInvestableAmount: $maxInvestableAmount.value
		};

		if (!isNew) updatedFund['_id'] = $fund._id;

		const requiredFields = ['ticker'];
		requiredFields.map((field) => {
			if (!updatedFund[field]) {
				errors.push(`${field} is required`);
			}
		});

		if (errors.length) {
			notifyError();
			return;
		}

		saving = true;
		const res = isNew ? await fund.create(updatedFund) : await fund.update(updatedFund);

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
	<h1 class="mb-0">{isNew ? 'Add new ' : 'Edit '} fund</h1>
</div>

{#if !isNew}
	<div class="tabs mb-6">
		{#each tabs as tab}
			<a
				class="tab tab-lg tab-bordered"
				class:tab-active={activeTab === tab}
				on:click|preventDefault={() => (activeTab = tab)}>{tab}</a
			>
		{/each}
	</div>
{/if}

{#if activeTab === 'Fund details'}
	<div class="prose">
		<h1>Fund details</h1>
	</div>

	{#await fund.init(id)}
		<p>Loading fund...</p>
	{:then}
		{#if $myForm}
			<div>
				<div id="form-ticker">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="ticker">
							<span class="label-text">Ticker *</span>
						</label>
						<input
							type="text"
							bind:value={$ticker.value}
							class="input input-bordered w-full"
							class:input-error={$myForm.hasError('ticker.required')}
							id="ticker"
						/>
					</div>
					{#if $myForm.hasError('ticker.required')}
						<div class="text-error">Ticker is required</div>
					{/if}
				</div>

				<div id="form-name">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="name">
							<span class="label-text">Name</span>
						</label>
						<input
							type="text"
							bind:value={$name.value}
							class="input input-bordered w-full"
							id="name"
						/>
					</div>
				</div>

				<div id="form-manager">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="manager">
							<span class="label-text">Fund Manager</span>
						</label>
						<input
							type="text"
							bind:value={$manager.value}
							class="input input-bordered w-full"
							id="manager"
						/>
					</div>
				</div>

				<div id="form-description">
					<div class="form-control w-full max-w-md">
						<label class="label" for="description">
							<span class="label-text">Description</span>
						</label>
						<textarea
							class="textarea textarea-bordered"
							placeholder="Description"
							bind:value={$description.value}
							id="description"
						/>
					</div>
				</div>

				<div id="fund-inceptionDate">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="inceptionDate">
							<span class="label-text">Inception Date</span>
						</label>
						<input
							type="text"
							bind:value={$inceptionDate.value}
							class="input input-bordered w-full"
							placeholder="DD/MM/YYYY"
							id="inceptionDate"
						/>
					</div>
				</div>

				<div id="form-baseCurrency">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="baseCurrency">
							<span class="label-text">Base Currency</span>
						</label>
						<select
							class="select select-bordered"
							bind:value={$baseCurrency.value}
							id="baseCurrency"
						>
							<option>USD</option>
							<option>BTC</option>
							<option>EUR</option>
						</select>
					</div>
				</div>

				<div class="prose my-8">
					<h2>Fees</h2>
				</div>

				<div id="form-managementFee">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="managementFee">
							<span class="label-text">Management Fee (%)</span>
						</label>

						<input
							type="number"
							step="0.1"
							bind:value={$managementFee.value}
							class="input input-bordered w-full"
							placeholder="2.5"
							id="managementFee"
						/>
					</div>
				</div>

				<div id="form-performanceFee">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="performanceFee">
							<span class="label-text">Performance Fee (%)</span>
						</label>

						<input
							type="number"
							step="0.1"
							bind:value={$performanceFee.value}
							class="input input-bordered w-full"
							placeholder="10.0"
							id="performanceFee"
						/>
					</div>
				</div>

				<div class="prose my-8">
					<h2>Investment Limits</h2>
				</div>

				<div id="form-minInvestment">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="minInvestment">
							<span class="label-text">Minimum Investment ($)</span>
						</label>

						<input
							type="number"
							bind:value={$minInvestment.value}
							class="input input-bordered w-full"
							placeholder="1000"
							id="minInvestment"
						/>
					</div>
				</div>

				<div id="form-minAdditionalInvestment">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="minAdditionalInvestment">
							<span class="label-text">Minimum Additional Investment ($)</span>
						</label>

						<input
							id="minAdditionalInvestment"
							type="number"
							bind:value={$minAdditionalInvestment.value}
							class="input input-bordered w-full"
							placeholder="500"
						/>
					</div>
				</div>

				<div id="form-maxInvestableAmount">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="maxInvestableAmount">
							<span class="label-text">Max Investable Amount ($)</span>
						</label>

						<input
							id="maxInvestableAmount"
							type="number"
							bind:value={$maxInvestableAmount.value}
							class="input input-bordered w-full"
							placeholder="100000"
						/>
					</div>
				</div>

				<SaveButton onClick={save} {errors} {saved} {hasError} {saving} />
			</div>
		{/if}
	{/await}
{/if}

{#if activeTab === 'Prices'}
	<div class="prose">
		<h1>Prices</h1>
	</div>
	<div class="prose">
		TODO: This contains fund historical daily prices. Ideally prices should be updated via a daily
		cron job. We can also build a UI to edit historical prices.
	</div>
{/if}

{#if activeTab === 'Trades'}
	<div class="prose">
		<h1>Trades</h1>
	</div>
	<div class="prose">TODO: Filter trades by fund</div>
{/if}
