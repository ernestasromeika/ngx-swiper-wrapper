// http://idangero.us/swiper/api/#emitter
"use strict";
exports.SwiperEvents = [
    'init',
    'slideChangeStart',
    'slideChangeEnd',
    'slideNextStart',
    'slideNextEnd',
    'slidePrevStart',
    'slidePrevEnd',
    'transitionStart',
    'transitionEnd',
    'touchStart',
    'touchMove',
    'touchMoveOpposite',
    'sliderMove',
    'touchEnd',
    'click',
    'tap',
    'doubleTap',
    'imagesReady',
    'progress',
    'reachBeginning',
    'reachEnd',
    'destroy',
    'setTranslate',
    'setTransition',
    'autoplay',
    'autoplayStart',
    'autoplayStop',
    'lazyImageLoad',
    'lazyImageReady',
    'paginationRendered',
    'scroll'
];
var fadeObject = (function () {
    function fadeObject() {
    }
    return fadeObject;
}());
exports.fadeObject = fadeObject;
var flipObject = (function () {
    function flipObject() {
    }
    return flipObject;
}());
exports.flipObject = flipObject;
var cubeObject = (function () {
    function cubeObject() {
    }
    return cubeObject;
}());
exports.cubeObject = cubeObject;
var coverflowObject = (function () {
    function coverflowObject() {
    }
    return coverflowObject;
}());
exports.coverflowObject = coverflowObject;
var SwiperConfig = (function () {
    function SwiperConfig(config) {
        if (config === void 0) { config = {}; }
        this.assign(config);
    }
    SwiperConfig.prototype.assign = function (config) {
        if (config === void 0) { config = {}; }
        for (var key in config) {
            this[key] = config[key];
        }
    };
    return SwiperConfig;
}());
exports.SwiperConfig = SwiperConfig;
//# sourceMappingURL=swiper.interfaces.js.map