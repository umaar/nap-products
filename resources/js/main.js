// Import 'babel-polyfill';
import $ from './vendor/jquery-3.0.0.min.js';
import browserCheck from './browserCheck';
import autocomplete from './autocomplete.js';
import handleInfiniteScroll from './infiniteScroll.js';
import handleDesignerFilter from './designerFilter.js';

$(() => {
	browserCheck();
	autocomplete();
	handleDesignerFilter();
	handleInfiniteScroll();
});
