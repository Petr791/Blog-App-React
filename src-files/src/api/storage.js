export function setNumber(quantity, postsNumber) {
	localStorage.setItem(quantity, JSON.stringify(postsNumber));
}
export function getNumber(quantity) {
	return localStorage.getItem(quantity);
}