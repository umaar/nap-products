import UAParser from './vendor/ua-parser.min.js';
import $ from './vendor/jquery-3.0.0.min.js';

function check() {
	const parser = new UAParser();
	const browserName = parser.getBrowser().name;
	if (browserName !== 'Chrome') {
		$('.unsupported-message').fadeIn();
	}
}

export default check;
