export function create_router(app) {

    const router = Router({
        '/test'() {
            app.show_page('test');
        },
    });

    router.refresh = () => window.onhashchange();

    router.configure({
        notfound() {
            console.error('url not found');
            app.navigate('test')
        },
        before() {
            app.set({
                no_scroll: false,
                url: window.location.hash.slice(1),
            });
        },
    });

    router.init();
}