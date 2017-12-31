import {
    BaseComponent,
    components,
    create_component,
    partials,
} from './component_helpers.js';
import {create_router} from './routing.js';

import './components/page_components/enter/enter.js';
import './components/page_components/navigation/navigation.js';
import './components/page_components/home/home.js';
import './components/page_components/news/news.js';

export let router;

const app_initial_data = {
    loading: true,
};

window.app = null;

window.create_app = () => {

    const app = new BaseComponent({
        template: `
            ${partials()}
            {{#if current_page}}
                {{#if current_page !== 'enter'}}
                    <navigation/>
                {{/if}}
                {{>.current_page}}
            {{/if}}
        `,
        components,
        data() {
            return {
                colors: {
                    yellow: '#f9d50d',
                    green: '#12813f',
                },
                typing_hero: false,
            }
        },
        computed: {},
        current_page() {
            return this.findComponent(this.get('current_page'));
        },
        show_page(current_page, data = {}) {
            let initialised;

            const instance = app.findComponent(current_page);
            if (instance) {
                initialised = instance.set(data);
            }
            else {
                const component = app.components[current_page];
                if (component) {
                    component.component_initial_options = data;
                }
                initialised = app.set({current_page, loading: false});
            }
            return initialised.then(() => {
                return app.findComponent(current_page);
            });
        },
        show_error(message) {
            app.set({
                app_error: true,
                app_error_msg: message,
            });
        },
        navigate(url) {
            if (router) {
                router.setRoute(url);
            }
        },
    });

    window.app = app;
    app.render('#page');

    router = create_router(app);
    app.router = router;
    app.show_page('enter');
};