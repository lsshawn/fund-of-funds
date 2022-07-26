<script>
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	const name = field('name', '', [required()]);
	const contactPerson = field('contactPerson', '', []);
	const description = field('description', '', []);
	const launchDate = field('launchDate', '', []);
	const baseCurrency = field('baseCurrency', '', []);
	const managementFee = field('managementFee', '', []);
	const performanceFee = field('performanceFee', '', []);
	const minimumInvestment = field('minimumInvestment', '', []);
	const minimumAdditionalInvestment = field('minimumAdditionalInvestmentu', '', []);
	const fundForm = form(
		name,
		contactPerson,
		description,
		launchDate,
		baseCurrency,
		managementFee,
		performanceFee
	);
</script>

<div class="prose">
	<h1>Fund name</h1>

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

	<div id="contactPerson">
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Contact Person</span>
			</label>
			<input type="text" bind:value={$contactPerson.value} class="input input-bordered w-full" />
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

	<div id="launchDate">
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Launch Date</span>
			</label>
			<input
				type="text"
				bind:value={$launchDate.value}
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
