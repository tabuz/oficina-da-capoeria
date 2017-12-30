import {create_component} from '../../../component_helpers.js';
import template from './home.ractive.html';

create_component('home', {
    template,
    oninit() {
    },
    oncomplete() {
    	function format_strings (strings) {
			let prefix = 'THIS IS <span class="text-actent">';
	    	let appendix = '</span>';
	    	let new_strings = [];

    		return strings.map((string) => {
    			return `${prefix}${string}${appendix}`;
    		})
    		
    	}
    	console.log(
    		format_strings([
				'WHAT WE LIVE',
    			'WHO WE ARE',
    			'CAPOEIRA',
		  	]))
    	let options = {
			strings: format_strings([
				'HOW WE LIVE',
    			'WHO WE ARE',
    			'CAPOEIRA',
		  	]),
		  	typeSpeed: 60
		}
    	let typed = new Typed(".typed-input", options)
    }
});
