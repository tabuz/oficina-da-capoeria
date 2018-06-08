import {create_component} from '../../../component_helpers.js';
import template from './home.ractive.html';

create_component('home', {
    template,
    data: {
        home_slides: [
            {
                text: '<b>Where can I</b>',
                subline: '<b>learn Capoeira?</b>',
            },
            {
                text: '<b>History and</b>',
                subline: '<b>culture of Capoeira</b>',
            },
            {
                text: '<b>Free</b>',
                subline: '<b>introductory classes</b>',
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
