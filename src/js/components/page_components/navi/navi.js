import {create_component} from '../../../component_helpers.js';
import template from './navi.ractive.html';



create_component('navi', {
    template,

    oninit() {
    	
    },
    onrender() {
        this.set('navi_top', $('#navi').position().top);
    },
    oncomplete() {
        document.addEventListener('scroll', (e) => {
            if ($(document).scrollTop() >= this.get('navi_top')) {
                this.set('active', true);
            } else {
                this.set('active', false);
            }
        });
    }
});
