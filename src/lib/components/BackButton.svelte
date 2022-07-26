<script>
	import ChevronLeft from '$lib/assets/icons/ChevronLeft.svelte';

	function back() {
		history.back();
	}
</script>

<button class="mb-8 btn btn-circle btn-link text-gray-900 mr-2" on:click={back}>
	<ChevronLeft />
</button>
