import UAParser from './ua-parser.min.js';
import $ from './jquery-3.0.0.min.js';

function check() {
	const parser = new UAParser();
	const browserName = parser.getBrowser().name;
	if (browserName !== 'Chrome') {
		$('.unsupported-message').fadeIn();
	}
}

export default check;