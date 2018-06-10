import {create_component} from '../../../component_helpers.js';
import template from './home.ractive.html';

create_component('home', {
    template,
    data: {
        home_slides: [
            {
                text: 'Where can I',
                subline: 'learn Capoeira?',
            },
            {
                text: 'History and culture',
                subline: 'of Brazilian Capoeira',
            },
            {
                text: 'Free',
                subline: 'introductory classes',
            }
        ]
    },
    oninit() {
    	
    },
    onrender() {
    },
    oncomplete() {
        $('.slider').slider();
        $('.slider').slider('next');
    }
});
