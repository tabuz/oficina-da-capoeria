import {create_component} from '../../../component_helpers.js';
import template from './enter.ractive.html';

create_component('enter', {
    template,
    oninit() {
    	this.set('loading', true);
    	
    },
    oncomplete() {
    	setTimeout( () => {
    		this.set('loading', false);
    		setTimeout( () => {
	    		jQuery('#vmap').vectorMap({
				    map: 'world_en',
				    backgroundColor: null,
				    color: app.get('colors.yellow'),
				    hoverOpacity: 0.7,
				    selectedColor: app.get('colors.green'),
				    enableZoom: false,
				    showTooltip: false,
				    scaleColors: ['#C8EEFF', '#006491'],
				    normalizeFunction: 'polynomial',
				     onRegionClick: function(element, code, region)
				    {
				        var message = 'You clicked "'
				            + region
				            + '" which has the code: '
				            + code.toUpperCase();

				        console.log(message);
				        app.show_page('home');
				    }
				});
			}, 100);
    	}, 3000);
    }
});
