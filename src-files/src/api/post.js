const BASE_URL = 'https://dummyjson.com';

export function getPosts(postsNumber) {

	return fetch(`${BASE_URL}/posts?limit=${postsNumber}&select=id,title,body,userId`)

		.then(response => {
			if (!response.ok) {
				throw new Error('api response failed');
			}

			return response.json();
		});
}

export function deletePost(id) {
	return fetch(`${BASE_URL}/posts/${id}`, {
			method: 'DELETE',
		})
		.then(res => res.json())
		.then(console.log);
}

export function addPost(postObj) {

	return fetch(`${BASE_URL}/posts/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postObj)
	});
}