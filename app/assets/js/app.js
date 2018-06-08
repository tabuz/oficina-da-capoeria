/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.router = undefined;

	var _component_helpers = __webpack_require__(2);

	var _routing = __webpack_require__(4);

	__webpack_require__(5);

	var router = exports.router = void 0;

	var app_initial_data = {
	    loading: true
	};

	window.app = null;

	window.create_app = function () {

	    var app = new _component_helpers.BaseComponent({
	        template: '\n            ' + (0, _component_helpers.partials)() + '\n            {{#if current_page}}\n                {{#if current_page !== \'enter\'}}\n                    <navigation/>\n                {{/if}}\n                {{>.current_page}}\n            {{/if}}\n        ',
	        components: _component_helpers.components,
	        data: function data() {
	            return {
	                colors: {
	                    yellow: '#f9d50d',
	                    green: '#12813f'
	                }
	            };
	        },

	        computed: {},
	        current_page: function current_page() {
	            return this.findComponent(this.get('current_page'));
	        },
	        show_page: function show_page(current_page) {
	            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            var initialised = void 0;

	            var instance = app.findComponent(current_page);
	            if (instance) {
	                initialised = instance.set(data);
	            } else {
	                var component = app.components[current_page];
	                if (component) {
	                    component.component_initial_options = data;
	                }
	                initialised = app.set({ current_page: current_page, loading: false });
	            }
	            return initialised.then(function () {
	                return app.findComponent(current_page);
	            });
	        },
	        show_error: function show_error(message) {
	            app.set({
	                app_error: true,
	                app_error_msg: message
	            });
	        },
	        navigate: function navigate(url) {
	            if (router) {
	                router.setRoute(url);
	            }
	        }
	    });

	    window.app = app;
	    app.render('#page');

	    exports.router = router = (0, _routing.create_router)(app);
	    app.router = router;
	    app.show_page('home');
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.components = exports.BaseComponent = undefined;
	exports.create_component = create_component;
	exports.partials = partials;

	var _utils = __webpack_require__(3);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	Ractive.defaults.adapt = ['Ractive'];

	var BaseComponent = exports.BaseComponent = Ractive.extend({
	    navigate: function navigate(url) {
	        app.navigate(url);
	    }
	});

	var components = exports.components = {};

	function create_component(name, configuration) {
	    var initial_data = configuration.data;
	    var get_initial_data = void 0;

	    if (initial_data instanceof Function) {
	        get_initial_data = initial_data;
	    } else {
	        get_initial_data = function get_initial_data() {
	            return initial_data || {};
	        };
	    }

	    components[name] = BaseComponent.extend(utils.merge(configuration, {
	        isolated: true,
	        components: components,
	        data: function data() {
	            return utils.merge(get_initial_data(), { app: app });
	        }
	    }));
	    BaseComponent.components[name] = components[name];
	}

	function partials() {
	    return Object.keys(components).map(function (name) {
	        return '{{#partial ' + name + '}}<' + name + ' />{{/partial}}';
	    }).join('\n');
	}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.merge = merge;
	exports.merge_into = merge_into;
	function merge(a, b) {
	    return merge_into(merge_into({}, a), b);
	}

	function merge_into(a, b) {
	    for (var key in b) {
	        a[key] = b[key];
	    }return a;
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.create_router = create_router;
	function create_router(app) {

	    var router = Router({
	        '/test': function test() {
	            app.show_page('test');
	        }
	    });

	    router.refresh = function () {
	        return window.onhashchange();
	    };

	    router.configure({
	        notfound: function notfound() {
	            console.error('url not found');
	            app.navigate('test');
	        },
	        before: function before() {
	            app.set({
	                no_scroll: false,
	                url: window.location.hash.slice(1)
	            });
	        }
	    });

	    router.init();
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _component_helpers = __webpack_require__(2);

	var _homeRactive = __webpack_require__(6);

	var _homeRactive2 = _interopRequireDefault(_homeRactive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _component_helpers.create_component)('home', {
	    template: _homeRactive2.default,
	    data: {
	        home_slides: [{
	            text: '<b>Where can I</b>',
	            subline: '<b>learn Capoeira?</b>'
	        }, {
	            text: '<b>History and</b>',
	            subline: '<b>culture of Capoeira</b>'
	        }, {
	            text: '<b>Free</b>',
	            subline: '<b>introductory classes</b>'
	        }]
	    },
	    oninit: function oninit() {},
	    onrender: function onrender() {},
	    oncomplete: function oncomplete() {
	        $('.slider').slider();
	        $('.slider').slider('next');
	    }
	});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports={"v":3,"t":[{"t":7,"e":"div","a":{"class":"home row"},"f":[{"t":7,"e":"div","a":{"class":"col s8 offset-s2 margin-top-double"},"f":[{"t":7,"e":"div","a":{"class":"row logo"},"f":[{"t":7,"e":"img","a":{"src":"/assets/img/logo_small.png"}}," ",{"t":7,"e":"div","f":[{"t":7,"e":"span","f":["School of"]}," ",{"t":7,"e":"p","f":["apoeria"]}]}]}," ",{"t":7,"e":"div","a":{"class":"slider"},"f":[{"t":7,"e":"ul","a":{"class":"slides"},"f":[{"t":4,"f":[{"t":7,"e":"li","f":[{"t":7,"e":"div","a":{"class":"caption left-align"},"f":[{"t":7,"e":"h2","f":[{"t":3,"r":".text"}]}," ",{"t":7,"e":"h5","a":{"class":"light grey-text text-lighten-3"},"f":[{"t":3,"r":".subline"}]}]}]}],"n":52,"r":"home_slides"}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"nav-wrapper-custom"},"f":[{"t":7,"e":"ul","a":{"id":"nav-mobile","class":"no-margin"},"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Home"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["About Us"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Our Gallery"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["History"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Contact"]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"div","a":{"class":"col s8 offset-s2 black-text","style":"margin-top: 250px;"},"f":[{"t":7,"e":"h1","a":{"class":"black-text margin-bottom"},"f":["About group",{"t":7,"e":"br"},"& Capoeira"]}," ",{"t":7,"e":"p","a":{"class":"margin-left"},"f":["Although there are few official history records, it is known that Capoeira was created nearly 500 years ago in Brazil by African slaves (mainly from Angola). Taken from their homes against their will and kept in slavery, they started inventing fighting techniques for self-defense. To cover their inside combats from their prisoners, the African slaves used their traditional music, singing and dancing. Thus, the Capoeira continued its development and soon became not only for self-defense but for rebellion."]}," ",{"t":7,"e":"div","a":{"class":"row","style":"margin-top: 100px;"},"f":[{"t":7,"e":"div","a":{"class":"col s4 home-container --yellow"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["all_inclusive"]}," ",{"t":7,"e":"h4","f":["Dance"]}," ",{"t":7,"e":"p","f":["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"]}," ",{"t":7,"e":"button","a":{"class":"btn"},"f":["More"]}]}," ",{"t":7,"e":"div","a":{"class":"col s4 home-container --green"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["music_note"]}," ",{"t":7,"e":"h4","f":["music"]}," ",{"t":7,"e":"p","f":["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"]}," ",{"t":7,"e":"button","a":{"class":"btn"},"f":["More"]}]}," ",{"t":7,"e":"div","a":{"class":"col s4 home-container --greener"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["directions_run"]}," ",{"t":7,"e":"h4","f":["ACROBATICS"]}," ",{"t":7,"e":"p","f":["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"]}," ",{"t":7,"e":"button","a":{"class":"btn"},"f":["More"]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"row green","style":"margin-top: 100px;"},"f":[{"t":7,"e":"div","a":{"class":"col s8 offset-s2 text-right","style":"margin-top: 250px; margin-bottom: 250px;"},"f":[{"t":7,"e":"h1","a":{"class":""},"f":["BEGINNERS",{"t":7,"e":"br"},"CAPOEIRA COURSE"]}," ",{"t":7,"e":"button","a":{"class":"btn"},"f":["Join now"]}]}]}]};

/***/ })
/******/ ]);