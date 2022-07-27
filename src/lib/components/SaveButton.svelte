<script>
	import Check from '$lib/assets/icons/Check.svelte';
	import ExclamationCircle from '$lib/assets/icons/ExclamationCircle.svelte';

	export let onClick = () => {};
	export let saving = false;
	export let saved = false;
	export let hasError = false;
	export let errors = [];
</script>

<section class="mt-6">
	<div class="text-sm">* required fields</div>
	<button
		class="btn btn-primary mt-6"
		on:click={onClick}
		class:loading={saving}
		class:btn-success={saved}
		class:btn-error={hasError}
	>
		{#if saved}
			<Check />
		{/if}

		{#if hasError}
			<ExclamationCircle />
		{/if}

		{saved ? 'Saved' : hasError ? 'Error' : 'Save'}
	</button>

	{#if errors.length}
		<section id="error" class="prose">
			<div class="text-error text-bold">Error in saving:</div>
			<ul class="mt-0">
				{#each errors as error}
					<li class="text-error">{error}</li>
				{/each}
			</ul>
		</section>
	{/if}
</section>
