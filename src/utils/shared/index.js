export function priceFormat(x) {
	let num = Number.parseFloat(x);
	num = +num.toFixed(2);

	return num;
}

export function cartTotal(total, shipping) {
	return parseFloat((total + shipping).toFixed(10));
}