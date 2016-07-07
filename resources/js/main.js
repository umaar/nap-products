// import 'babel-polyfill';
import browserCheck from './browserCheck';
import $ from './jquery-3.0.0.min.js';
import autocomplete from './autocomplete.js';
import handleInfiniteScroll from './infiniteScroll.js';
import handleDesignerFilter from './designerFilter.js';

$(() => {
	browserCheck();
	autocomplete();
	handleDesignerFilter();
	handleInfiniteScroll();
});





