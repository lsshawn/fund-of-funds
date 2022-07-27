<script>
	import DataTable from '$lib/components/DataTable.svelte';

	import { customerPositions } from '$lib/stores/position.ts';

	import headers from '$lib/assets/json/PositionTableHeader.json';

	export let customerId;

	$: equity = $customerPositions.reduce((accum, position) => {
		return (accum += position.marketValue);
	}, 0);

	$: portfolioWeights = $customerPositions.reduce((prev, position) => {
		prev[position.asset.ticker] = (position.marketValue / equity) * 100;
		return prev;
	}, {});

	let newPortfolioWeights = $customerPositions.reduce((prev, position) => {
		prev[position.asset.ticker] = 0;
		return prev;
	}, {});

	function calcRebalanceTrade(ticker) {
		const newWeight = newPortfolioWeights[ticker] / 100;
		if (newWeight === 0) return '';
		const position = $customerPositions.filter((obj) => obj.asset.ticker === ticker)[0];
		const positionWeight = position.marketValue / equity;

		if (newWeight === positionWeight) return '';

		const orderType = newWeight > positionWeight ? 'Buy' : 'Sell';

		const newMarketValue = (newWeight - positionWeight) * equity;
		const quantityToTrade = newMarketValue / position.asset.lastPrice;
		return `${orderType} ${quantityToTrade.toLocaleString()} unit (market value of $ ${newMarketValue.toLocaleString(
			0
		)})`;
	}
</script>

<div>
	{#await customerPositions.init(customerId)}
		<p>Loading customer positions...</p>
	{:then}
		<!-- TODO: summary should be calculated in server -->
		<div class="stats shadow my-6">
			<div class="stat">
				<div class="stat-title">Equity</div>
				<div class="stat-value">
					$ {equity.toLocaleString('en-US', { minimumFractionDigits: 0 })}
				</div>
			</div>
		</div>

		<DataTable {headers} data={$customerPositions} />

		<div class="prose my-6"><h2>Rebalance Customer Position</h2></div>
		<div class="form-control">
			<label class="input-group input-group-md mt-2">
				<span class="w-[100px]">Ticker</span>
				<input type="text" class="input input-ghost" disabled value="Current Weight %" />
				<input type="text" class="input input-bordered" disabled value="New Weight %" />
			</label>
			{#each $customerPositions as position}
				<label class="input-group input-group-md mt-2">
					<span class="w-[100px]">{position.asset.ticker} (%)</span>
					<input
						type="number"
						class="input input-ghost disabled text-right"
						value={(position.marketValue / equity) * 100}
						disabled
					/>
					<input
						type="number"
						step="0.01"
						class="input input-bordered text-right"
						bind:value={newPortfolioWeights[position.asset.ticker]}
					/>
				</label>
			{/each}

			<h3>Trades to rebalance</h3>
			{#each Object.keys(newPortfolioWeights) as ticker}
				{#if ticker !== 'USD'}
					<div>
						{ticker}: {calcRebalanceTrade(ticker)}
					</div>
				{/if}
			{/each}
		</div>
	{/await}
</div>
