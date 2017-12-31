import {create_component} from '../../../component_helpers.js';
import template from './news.ractive.html';

create_component('news', {
    template,
    oninit() { 
    	FB.api(
		    "/capoeira.bristol/feed",
		    function (response) {
		      if (response && !response.error) {
		        console.log(response);
		      }
		      if (response && response.error) {
		        console.log('error', response);
		      }
		    }
		);  	
    },
    oncomplete() {
    }
});
