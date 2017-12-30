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

	__webpack_require__(7);

	__webpack_require__(9);

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

	var _enterRactive = __webpack_require__(6);

	var _enterRactive2 = _interopRequireDefault(_enterRactive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _component_helpers.create_component)('enter', {
					template: _enterRactive2.default,
					oninit: function oninit() {
									this.set('loading', true);
					},
					oncomplete: function oncomplete() {
									var _this = this;

									setTimeout(function () {
													_this.set('loading', false);
													setTimeout(function () {
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
																					onRegionClick: function onRegionClick(element, code, region) {
																									var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();

																									console.log(message);
																									app.show_page('home');
																					}
																	});
													}, 100);
									}, 3000);
					}
	});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports={"v":3,"t":[{"t":7,"e":"main","a":{"class":"enter"},"f":[{"t":7,"e":"div","a":{"class":"center-wrapper"},"f":[{"t":4,"f":[{"t":7,"e":"img","a":{"src":"/assets/img/oficina_white_yellow.png","alt":"Oficina Da Capoeria International - Logo","class":"fade-in-slow","style":"height: 500px; width: auto;"}}],"n":50,"r":"loading"}," ",{"t":7,"e":"div","a":{"id":"vmap"},"m":[{"t":4,"f":["class=\"fade-in-slow\" style=\"width: 1000px; height: 800px;\""],"n":50,"x":{"r":["loading"],"s":"!_0"}}]}]}]}]};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _component_helpers = __webpack_require__(2);

	var _navigationRactive = __webpack_require__(8);

	var _navigationRactive2 = _interopRequireDefault(_navigationRactive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _component_helpers.create_component)('navigation', {
	    template: _navigationRactive2.default,
	    oninit: function oninit() {},
	    oncomplete: function oncomplete() {}
	});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports={"v":3,"t":[{"t":7,"e":"div","a":{"class":"navbar-fixed"},"f":[{"t":7,"e":"nav","f":[{"t":7,"e":"div","a":{"class":"nav-wrapper"},"f":[{"t":7,"e":"a","a":{"href":"#","class":"brand-logo"},"f":[{"t":7,"e":"img","a":{"src":"/assets/img/oficina_white_yellow_small.png","alt":"Oficina Da Capoeira Logo"}}]}," ",{"t":7,"e":"ul","a":{"id":"nav-mobile","class":"right hide-on-med-and-down"},"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Home"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["History"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["School"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Videos"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Gallery"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":"#"},"f":["Prices"]}]}]}]}]}]}]};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _component_helpers = __webpack_require__(2);

	var _homeRactive = __webpack_require__(10);

	var _homeRactive2 = _interopRequireDefault(_homeRactive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _component_helpers.create_component)('home', {
	    template: _homeRactive2.default,
	    oninit: function oninit() {},
	    oncomplete: function oncomplete() {
	        function format_strings(strings) {
	            var prefix = 'THIS IS <span class="text-actent">';
	            var appendix = '</span>';
	            var new_strings = [];

	            return strings.map(function (string) {
	                return '' + prefix + string + appendix;
	            });
	        }
	        console.log(format_strings(['WHAT WE LIVE', 'WHO WE ARE', 'CAPOEIRA']));
	        var options = {
	            strings: format_strings(['HOW WE LIVE', 'WHO WE ARE', 'CAPOEIRA']),
	            typeSpeed: 60
	        };
	        var typed = new Typed(".typed-input", options);
	    }
	});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports={"v":3,"t":[{"t":7,"e":"main","a":{"class":"home fade-in-fast"},"f":[{"t":7,"e":"div","a":{"class":"carousel --bg"}}," ",{"t":7,"e":"div","a":{"class":"carousel --content"},"f":[{"t":7,"e":"h1","a":{"class":"border-thick padding"},"f":[{"t":7,"e":"span","a":{"class":"typed-input"}}]}]}," ",{"t":7,"e":"section","a":{"id":"home"},"f":[{"t":7,"e":"div","a":{"class":"container padding"},"f":[{"t":7,"e":"div","a":{"class":"row green z-depth-5"},"f":[{"t":7,"e":"div","a":{"class":"col s12 padding"},"f":[{"t":7,"e":"div","a":{"class":"card green-darker padding"},"f":[{"t":7,"e":"div","a":{"class":"card-title"},"f":[{"t":7,"e":"h4","f":["Oficina Da Capoeira - Bristol"]}]}," ",{"t":7,"e":"div","a":{"class":"card-content"},"f":[{"t":7,"e":"h5","f":["Working with Graccie Barra hell yeah!"]}]}]}]}]}]}]}]}]};

/***/ })
/******/ ]);