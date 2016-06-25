function start() {
	console.log('ready');



	$.getJSON('http://localhost:3000/api/all-product-names', response => {
		var input = document.querySelector('input.product-search');
		console.log(response.data[0]);
		const autocomplete = new Awesomplete(input, {
			minChars: 1,
			list: response.data
		});

		window.addEventListener("awesomplete-highlight", ({text}) => {
			const selectedValue = text.value;
			console.log(selectedValue);
		}, false);
	})
}

$(start);