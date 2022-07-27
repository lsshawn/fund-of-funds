// import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		prerender: {
			default: false
		}
	}
}

export default config
