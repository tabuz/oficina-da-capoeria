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
    	let options = {
			strings: format_strings([
				'^300 HOW WE LIVE',
    			'^300 WHO WE ARE',
    			'^300 CAPOEIRA',
		  	]),
		  	typeSpeed: 60,
		  	backSpeed: 40,
		  	backDelay: 750,
		  	contentType: 'html',
		  	onComplete: (self) => {
		  		setTimeout(function(){app.toggle('typing_hero')}, 1000);
		  	},
		}
    	let typed = new Typed(".typed-input", options)
    }
});
