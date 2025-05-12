import {
	getDatePost
} from './get-post-date'
export function getNormalizedPosts(postsList) {

	let ids = [];
	let byIds = {};

	const MAX_NUMBER = 864000000;
	const MIN_NUMBER = 1080000;

	//const date = new Date(2025, 4, 10, 14, 20);
	const date = new Date();
	let milliseconds = date.getTime();

	//////////////////////////
	postsList.map(post => {
		ids.push(post.id);
		const newPost = post;
		//milliseconds = milliseconds - 2580000;
		//milliseconds = milliseconds - getRandomInt(1080000, 2580000);
		milliseconds = milliseconds - getRandomInt(MIN_NUMBER, MAX_NUMBER);
		const currentDate = new Date(milliseconds);

		newPost.time = getDatePost(currentDate);
		byIds[post.id] = newPost;
	});

	return [ids, byIds]
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}