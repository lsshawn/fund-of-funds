<script>
	import { tickers } from '$lib/stores/ticker.ts';

	const availableTickers = $tickers.map((obj) => obj.ticker);

	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	const ticker = field('firstName', '', [required()]);
	const quantity = field('quantity', '', [required()]);
	const fund = field('fund', '', []);
	const customer = field('customer', '', []);
	const type = field('type', '', [required()]);
	const counterparty = field('counterparty', '', []);
	const tradeForm = form(ticker, quantity, fund, customer, type, counterparty);

	const orderTypes = ['buy', 'sell', 'deposit', 'withdrawal', 'adjustment'];
</script>

<div class="prose">
	<h1>Trade</h1>

	<section id="form-ticker">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="ticker">
				<span class="label-text">Ticker *</span>
			</label>

			<select class="select select-bordered" bind:value={$ticker.value} id="ticker">
				{#each availableTickers as ticker}
					<option>{ticker}</option>
				{/each}
			</select>
		</div>
		{#if $tradeForm.hasError('ticker.required')}
			<div class="text-error">Ticker is required</div>
		{/if}
	</section>

	<section id="form-quantity">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="quantity">
				<span class="label-text">Quantity *</span>
			</label>

			<input
				type="number"
				step="0.00001"
				bind:value={$quantity.value}
				class="input input-bordered w-full"
				placeholder="10"
				id="quantity"
			/>
		</div>

		{#if $tradeForm.hasError('quantity.required')}
			<div class="text-error">Quantity is required</div>
		{/if}
	</section>

	<section id="form-type">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="type">
				<span class="label-text">Order Type *</span>
			</label>

			<select class="select select-bordered" bind:value={$type.value} id="type">
				{#each orderTypes as type}
					<option>{type}</option>
				{/each}
			</select>
		</div>
		{#if $tradeForm.hasError('type.required')}
			<div class="text-error">Type is required</div>
		{/if}
	</section>

	<!-- TODO what if a trade has multiple counterparties -->
	<section id="form-counterparty">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="counterparty">
				<span class="label-text">Counterparty</span>
			</label>

			<input
				type="text"
				bind:value={$counterparty.value}
				class="input input-bordered w-full"
				placeholder="Huobi"
				id="counterparty"
			/>
		</div>
	</section>
</div>
