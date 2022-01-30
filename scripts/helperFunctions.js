
function numberPostfix(n) {

	let digits = ('' + n).split('');

	if (digits.size >= 2) {

		const tenthDigit =
			digits[digits.length - 2];

		if (tenthDigit === '1') { return 'th'; }
	}

	const unitDigit =
		digits[digits.length - 1];

	switch (unitDigit) {
		case '1': return 'st';
		case '2': return 'nd';
		case '3': return 'rd';
	}

	return 'th';
}

// numberPostfix(11) === 'th'
// numberPostfix(21) === 'st'
// numberPostfix(22) === 'nd'
// numberPostfix(23) === 'rd'
// numberPostfix(24) === 'th'

function zeroFill(n1, n2) {

	let string = '' + n1;

	for(let i = 0; string.length < n2; i++) {
		string = '0' + string;
	}

	return string;
}

// zeroFill(32, 5) === '00035'
