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
		minimumInvestment,
		minimumAdditionalInvestment;

	const fundForm = form(
		name,
		manager,
		description,
		inceptionDate,
		baseCurrency,
		managementFee,
		performanceFee
	);

	const tabs = ['Fund details', 'Prices', 'Trades'];
	$: activeTab = tabs[0];
</script>

<div class="prose flex">
	<BackButton />
	<h1 class="mb-0">{isNew ? 'Add new ' : 'Edit '} fund</h1>
</div>

<!-- TODO only show if has fund -->
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
	<div>
		<div id="name">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Name *</span>
				</label>
				<input
					type="text"
					bind:value={$name.value}
					class="input input-bordered w-full"
					class:input-error={$fundForm.hasError('name.required')}
				/>
			</div>
			{#if $fundForm.hasError('name.required')}
				<div class="text-error">Name is required</div>
			{/if}
		</div>

		<div id="manager">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Contact Person</span>
				</label>
				<input type="text" bind:value={$manager.value} class="input input-bordered w-full" />
			</div>
		</div>

		<div id="description">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Description</span>
				</label>
				<textarea
					class="textarea textarea-bordered"
					placeholder="Fund description"
					bind:value={$description.value}
				/>
			</div>
		</div>

		<div id="inceptionDate">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Launch Date</span>
				</label>
				<input
					type="text"
					bind:value={$inceptionDate.value}
					class="input input-bordered w-full"
					placeholder="DD/MM/YYYY"
				/>
			</div>
		</div>

		<div id="baseCurrency">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Base Currency</span>
				</label>
				<select class="select select-bordered" bind:value={$baseCurrency.value}>
					<option>USD</option>
					<option>BTC</option>
					<option>EUR</option>
				</select>
			</div>
		</div>

		<div id="form-managementFee">
			<div class="form-control w-full max-w-xs">
				<label class="label" for="performanceFee">
					<span class="label-text">Management Fee (%)</span>
				</label>

				<input
					type="number"
					step="0.1"
					bind:value={$managementFee.value}
					class="input input-bordered w-full"
					placeholder="2.5"
					id="performanceFee"
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

		<div id="form-minimumInvestment">
			<div class="form-control w-full max-w-xs">
				<label class="label" for="minimumInvestment">
					<span class="label-text">Minimum Investment ($)</span>
				</label>

				<input
					type="number"
					bind:value={$minimumInvestment.value}
					class="input input-bordered w-full"
					placeholder="1000"
					id="minimumInvestment"
				/>
			</div>
		</div>

		<div id="form-minimumAdditionalInvestment">
			<div class="form-control w-full max-w-xs">
				<label class="label" for="minimumAdditionalInvestment">
					<span class="label-text">Minimum Additional Investment ($)</span>
				</label>

				<input
					id="minimumAdditionalInvestment"
					type="number"
					bind:value={$minimumAdditionalInvestment.value}
					class="input input-bordered w-full"
					placeholder="500"
				/>
			</div>
		</div>

		<section class="mt-6">
			<div>* required fields</div>

			<button class="btn btn-primary" on:click={fundForm.validate}>Save</button>
		</section>
	</div>
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
