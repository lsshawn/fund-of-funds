<script>
	import '$lib/style.css';
	import { user } from '$lib/stores/user.ts';

	import UserCircle from '$lib/assets/icons/UserCircle.svelte';

	import { page } from '$app/stores';
	$: basePath = $page.url.pathname.split('/')[1];

	const tabs = [
		{
			name: 'Funds',
			route: '/fund'
		},
		{
			name: 'Customers',
			route: '/customer'
		},
		{
			name: 'Trades',
			route: '/trade'
		}
	];
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-slate-100">
			<!-- drawer toggle icon -->
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>

			<div class="navbar-start">
				<div class="text-bold btn btn-ghost normal-case mr-3">
					<a href="/">ABC Ventures Capital</a>
				</div>

				<!-- top menu -->
				<div class="flex-none hidden lg:block">
					<ul class="menu menu-horizontal">
						{#each tabs as tab}
							<li>
								<a href={tab.route} class:active={basePath === tab.route.replace('/', '')}
									>{tab.name}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="navbar-end">
				<UserCircle />
				<span class="ml-1">
					{$user.firstName}
				</span>
			</div>
		</div>

		<!-- Page content here -->
		<div class="p-6 pb-16 w-screen">
			<slot />
		</div>
	</div>
	<!-- drawer menu -->
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
			{#each tabs as tab}
				<li>
					<a href={tab.route} class:active={basePath === tab.route.replace('/', '')}>{tab.name}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
