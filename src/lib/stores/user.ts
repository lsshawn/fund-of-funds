import { writable } from 'svelte/store'

// TODO: Login and get from DB with JWT token
const userDocument = {
	_id: '62dff1f3fc01706680fb6a3c',
	email: 'l@sshawn.com',
	firstName: 'Shawn',
	role: 'admin'
}

function createUser() {
	const { subscribe } = writable(userDocument)

	return {
		subscribe
	}
}

export const user = createUser()
