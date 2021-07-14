export function sum(arr, position){
	let sum = 0;
	arr.forEach(order => {
		sum += parseInt(order[position].text);
	})
	return sum;
}