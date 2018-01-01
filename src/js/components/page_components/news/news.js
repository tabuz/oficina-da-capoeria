import {create_component} from '../../../component_helpers.js';
import template from './news.ractive.html';

create_component('news', {
    template,
    oninit() { 
    	console.log('config', app.get('config'));
    	FB.api(
		    `/capoeira.bristol/feed?access_token=${app.get('config.FB_SECRET_KEY')}`,
		    function (response) {
		      if (response && !response.error) {
		        console.log(response);
		        app.set('news_feed', response.data);
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
