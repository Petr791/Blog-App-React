function formatDate(date) {

	let dd = date.getDate();
	if (dd < 10) dd = '0' + dd;

	let mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	let yyyy = date.getFullYear();

	let hh = date.getHours();
	if (hh < 10) hh = '0' + hh;

	let mt = date.getMinutes();
	if (mt < 10) mt = '0' + mt;
	//console.log(`${dd}.${mm}.${yyyy} ${hh}:${mt}`);
	return `${dd}.${mm}.${yyyy} ${hh}:${mt}`;
}




export function getDatePost(currentDate) {
	const datePost = formatDate(currentDate);
	return datePost;
}