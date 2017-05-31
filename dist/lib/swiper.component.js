"use strict";
var Swiper = require("swiper");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var swiper_interfaces_1 = require("./swiper.interfaces");
var SwiperComponent = (function () {
    function SwiperComponent(zone, platformId, elementRef, differs, defaults) {
        this.zone = zone;
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.differs = differs;
        this.defaults = defaults;
        this.hidden = false;
        this.disabled = false;
        this.runInsideAngular = false;
        this.indexChange = new core_3.EventEmitter();
        this.s_init = new core_3.EventEmitter();
        this.s_slideChangeStart = new core_3.EventEmitter();
        this.s_slideChangeEnd = new core_3.EventEmitter();
        this.s_slideNextStart = new core_3.EventEmitter();
        this.s_slideNextEnd = new core_3.EventEmitter();
        this.s_slidePrevStart = new core_3.EventEmitter();
        this.s_slidePrevEnd = new core_3.EventEmitter();
        this.s_transitionStart = new core_3.EventEmitter();
        this.s_transitionEnd = new core_3.EventEmitter();
        this.s_touchStart = new core_3.EventEmitter();
        this.s_touchMove = new core_3.EventEmitter();
        this.s_touchMoveOpposite = new core_3.EventEmitter();
        this.s_sliderMove = new core_3.EventEmitter();
        this.s_touchEnd = new core_3.EventEmitter();
        this.s_click = new core_3.EventEmitter();
        this.s_tap = new core_3.EventEmitter();
        this.s_doubleTap = new core_3.EventEmitter();
        this.s_imagesReady = new core_3.EventEmitter();
        this.s_progress = new core_3.EventEmitter();
        this.s_reachBeginning = new core_3.EventEmitter();
        this.s_reachEnd = new core_3.EventEmitter();
        this.s_destroy = new core_3.EventEmitter();
        this.s_setTranslate = new core_3.EventEmitter();
        this.s_setTransition = new core_3.EventEmitter();
        this.s_autoplay = new core_3.EventEmitter();
        this.s_autoplayStart = new core_3.EventEmitter();
        this.s_autoplayStop = new core_3.EventEmitter();
        this.s_lazyImageLoad = new core_3.EventEmitter();
        this.s_lazyImageReady = new core_3.EventEmitter();
        this.s_paginationRendered = new core_3.EventEmitter();
        this.s_scroll = new core_3.EventEmitter();
        this.swiperWrapper = null;
        this.useSwiperClass = true;
    }
    SwiperComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.showButtons = false;
            this.showScrollbar = false;
            this.showPagination = false;
            var element_1 = this.elementRef.nativeElement;
            var options_1 = new swiper_interfaces_1.SwiperConfig(this.defaults);
            options_1.assign(this.config); // Custom config
            if (this.initialIndex != null) {
                options_1.initialSlide = this.initialIndex;
            }
            if (options_1.scrollbar === true || options_1.scrollbar === '.swiper-scrollbar') {
                this.showScrollbar = true;
                options_1.scrollbar = element_1.querySelector('.swiper-scrollbar');
            }
            if (options_1.pagination === true || options_1.pagination === '.swiper-pagination') {
                this.showPagination = true;
                options_1.pagination = element_1.querySelector('.swiper-pagination');
            }
            if (options_1.prevButton === true || options_1.prevButton === '.swiper-button-prev') {
                this.showButtons = true;
                options_1.prevButton = element_1.querySelector('.swiper-button-prev');
            }
            if (options_1.nextButton === true || options_1.nextButton === '.swiper-button-next') {
                this.showButtons = true;
                options_1.nextButton = element_1.querySelector('.swiper-button-next');
            }
            if (!options_1['onSlideChangeStart']) {
                options_1['onSlideChangeStart'] = function (swiper) {
                    _this.zone.run(function () {
                        _this.isAtLast = swiper.isEnd;
                        _this.isAtFirst = swiper.isBeginning;
                        _this.indexChange.emit(swiper.snapIndex);
                    });
                };
            }
            if (!options_1['onScrollbarDragEnd']) {
                options_1['onScrollbarDragEnd'] = function (swiper) {
                    _this.zone.run(function () {
                        _this.isAtLast = swiper.isEnd;
                        _this.isAtFirst = swiper.isBeginning;
                        _this.indexChange.emit(swiper.snapIndex);
                    });
                };
            }
            if (!options_1['paginationBulletRender']) {
                options_1['paginationBulletRender'] = function (swiper, index, className) {
                    if (_this.swiper) {
                        if (index === 0) {
                            return '<span class="swiper-pagination-handle" index=' + index + '>' +
                                '<span class="' + className + ' ' + className + '-first"></span></span>';
                        }
                        else if (index === (_this.swiper.slides.length - 1)) {
                            return '<span class="swiper-pagination-handle" index=' + index + '>' +
                                '<span class="' + className + ' ' + className + '-last"></span></span>';
                        }
                        else {
                            return '<span class="swiper-pagination-handle" index=' + index + '>' +
                                '<span class="' + className + ' ' + className + '-middle"></span></span>';
                        }
                    }
                };
            }
            if (this.runInsideAngular) {
                this.swiper = new Swiper(element_1.children[0], options_1);
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper = new Swiper(element_1.children[0], options_1);
                });
            }
            // Add native swiper event handling
            swiper_interfaces_1.SwiperEvents.forEach(function (eventName) {
                var self = _this;
                _this.swiper.on(eventName, function (event) {
                    self["s_" + eventName].emit(event);
                });
            });
            if (!this.configDiff) {
                this.configDiff = this.differs.find(this.config || {}).create(null);
            }
        }
    };
    SwiperComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            var changes = this.configDiff.diff(this.config || {});
            var children = this.swiperWrapper.nativeElement.children.length;
            if (changes) {
                this.initialIndex = this.getIndex();
                changes.forEachAddedItem(function (changed) {
                    if (changed.key === 'initialSlide') {
                        _this.initialIndex = _this.config.initialSlide;
                    }
                });
                this.ngOnDestroy();
                // Timeout is needed for the styles to update properly
                setTimeout(function () {
                    _this.ngOnInit();
                    _this.update();
                }, 0);
            }
            else if (children !== this.childsDiff) {
                this.childsDiff = children;
                this.update();
            }
        }
    };
    SwiperComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiper) {
                if (this.runInsideAngular) {
                    this.swiper.destroy(true, true);
                }
                else {
                    this.zone.runOutsideAngular(function () {
                        _this.swiper.destroy(true, true);
                    });
                }
                this.swiper = null;
            }
        }
    };
    SwiperComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiper && changes['hidden'] && this.hidden) {
                // For some reason resize causes Swiper to change index when hidden
                this.initialIndex = this.swiper.activeIndex || 0;
            }
            if (this.swiper && changes['hidden'] && !this.hidden) {
                // For some reason resize causes Swiper to change index when hidden
                this.swiper.activeIndex = this.initialIndex || 0;
                this.update(true);
            }
            if (this.swiper && changes['disabled'] && !this.hidden) {
                if (changes['disabled'].currentValue != changes['disabled'].previousValue) {
                    if (changes['disabled'].currentValue === true) {
                        if (this.runInsideAngular) {
                            this.swiper.lockSwipes();
                        }
                        else {
                            this.zone.runOutsideAngular(function () {
                                _this.swiper.lockSwipes();
                            });
                        }
                    }
                    else if (changes['disabled'].currentValue === false) {
                        if (this.runInsideAngular) {
                            this.swiper.unlockSwipes();
                        }
                        else {
                            this.zone.runOutsideAngular(function () {
                                _this.swiper.unlockSwipes();
                            });
                        }
                    }
                }
                this.update(false);
            }
        }
    };
    SwiperComponent.prototype.update = function (updateTranslate) {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiperWrapper) {
                for (var i = 0; i < this.swiperWrapper.nativeElement.children.length; i++) {
                    this.swiperWrapper.nativeElement.children[i].classList.add('swiper-slide');
                }
            }
            setTimeout(function () {
                if (_this.swiper) {
                    if (_this.runInsideAngular) {
                        _this.swiper.update();
                        if (updateTranslate) {
                            setTimeout(function () {
                                if (_this.swiper) {
                                    _this.swiper.update(true);
                                }
                            }, 0);
                        }
                    }
                    else {
                        _this.zone.runOutsideAngular(function () {
                            _this.swiper.update();
                            if (updateTranslate) {
                                setTimeout(function () {
                                    if (_this.swiper) {
                                        _this.swiper.update(true);
                                    }
                                }, 0);
                            }
                        });
                    }
                    _this.isAtFirst = _this.swiper.isBeginning;
                    _this.isAtLast = _this.swiper.isEnd;
                }
            }, 0);
        }
    };
    SwiperComponent.prototype.getIndex = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (!this.swiper) {
                return this.initialIndex;
            }
            else {
                return this.swiper.activeIndex;
            }
        }
    };
    SwiperComponent.prototype.setIndex = function (index, speed, callbacks) {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (!this.swiper || this.hidden) {
                this.initialIndex = index;
            }
            else {
                if (this.runInsideAngular) {
                    this.swiper.slideTo(index, speed, callbacks);
                }
                else {
                    this.zone.runOutsideAngular(function () {
                        _this.swiper.slideTo(index, speed, callbacks);
                    });
                }
            }
        }
    };
    SwiperComponent.prototype.prevSlide = function (callbacks, speed) {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiper) {
                if (this.runInsideAngular) {
                    this.swiper.slidePrev(callbacks, speed);
                }
                else {
                    this.zone.runOutsideAngular(function () {
                        _this.swiper.slidePrev(callbacks, speed);
                    });
                }
            }
        }
    };
    SwiperComponent.prototype.nextSlide = function (callbacks, speed) {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiper) {
                if (this.runInsideAngular) {
                    this.swiper.slideNext(callbacks, speed);
                }
                else {
                    this.zone.runOutsideAngular(function () {
                        _this.swiper.slideNext(callbacks, speed);
                    });
                }
            }
        }
    };
    SwiperComponent.prototype.stopPlay = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiper) {
                if (this.runInsideAngular) {
                    this.swiper.stopAutoplay();
                }
                else {
                    this.zone.runOutsideAngular(function () {
                        _this.swiper.stopAutoplay();
                    });
                }
            }
        }
    };
    SwiperComponent.prototype.startPlay = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.swiper) {
                if (this.runInsideAngular) {
                    this.swiper.startAutoplay();
                }
                else {
                    this.zone.runOutsideAngular(function () {
                        _this.swiper.startAutoplay();
                    });
                }
            }
        }
    };
    SwiperComponent.prototype.onIndexSelect = function (event) {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.setIndex(event.target.attributes.index.value);
        }
    };
    return SwiperComponent;
}());
SwiperComponent.decorators = [
    { type: core_2.Component, args: [{
                selector: 'swiper',
                templateUrl: './swiper.component.html',
                styleUrls: ['./swiper.component.css'],
                encapsulation: core_3.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SwiperComponent.ctorParameters = function () { return [
    { type: core_1.NgZone, },
    { type: Object, decorators: [{ type: core_1.Inject, args: [core_1.PLATFORM_ID,] },] },
    { type: core_3.ElementRef, },
    { type: core_1.KeyValueDiffers, },
    { type: swiper_interfaces_1.SwiperConfig, decorators: [{ type: core_2.Optional },] },
]; };
SwiperComponent.propDecorators = {
    'hidden': [{ type: core_3.HostBinding, args: ['hidden',] }, { type: core_3.Input },],
    'disabled': [{ type: core_3.Input },],
    'config': [{ type: core_3.Input },],
    'runInsideAngular': [{ type: core_3.Input },],
    'indexChange': [{ type: core_3.Output },],
    's_init': [{ type: core_3.Output, args: ['init',] },],
    's_slideChangeStart': [{ type: core_3.Output, args: ['slideChangeStart',] },],
    's_slideChangeEnd': [{ type: core_3.Output, args: ['slideChangeEnd',] },],
    's_slideNextStart': [{ type: core_3.Output, args: ['slideNextStart',] },],
    's_slideNextEnd': [{ type: core_3.Output, args: ['slideNextEnd',] },],
    's_slidePrevStart': [{ type: core_3.Output, args: ['slidePrevStart',] },],
    's_slidePrevEnd': [{ type: core_3.Output, args: ['slidePrevEnd',] },],
    's_transitionStart': [{ type: core_3.Output, args: ['transitionStart',] },],
    's_transitionEnd': [{ type: core_3.Output, args: ['transitionEnd',] },],
    's_touchStart': [{ type: core_3.Output, args: ['touchStart',] },],
    's_touchMove': [{ type: core_3.Output, args: ['touchMove',] },],
    's_touchMoveOpposite': [{ type: core_3.Output, args: ['touchMoveOpposite',] },],
    's_sliderMove': [{ type: core_3.Output, args: ['sliderMove',] },],
    's_touchEnd': [{ type: core_3.Output, args: ['touchEnd',] },],
    's_click': [{ type: core_3.Output, args: ['click',] },],
    's_tap': [{ type: core_3.Output, args: ['tap',] },],
    's_doubleTap': [{ type: core_3.Output, args: ['doubleTap',] },],
    's_imagesReady': [{ type: core_3.Output, args: ['imagesReady',] },],
    's_progress': [{ type: core_3.Output, args: ['progress',] },],
    's_reachBeginning': [{ type: core_3.Output, args: ['reachBeginning',] },],
    's_reachEnd': [{ type: core_3.Output, args: ['reachEnd',] },],
    's_destroy': [{ type: core_3.Output, args: ['destroy',] },],
    's_setTranslate': [{ type: core_3.Output, args: ['setTranslate',] },],
    's_setTransition': [{ type: core_3.Output, args: ['setTransition',] },],
    's_autoplay': [{ type: core_3.Output, args: ['autoplay',] },],
    's_autoplayStart': [{ type: core_3.Output, args: ['autoplayStart',] },],
    's_autoplayStop': [{ type: core_3.Output, args: ['autoplayStop',] },],
    's_lazyImageLoad': [{ type: core_3.Output, args: ['lazyImageLoad',] },],
    's_lazyImageReady': [{ type: core_3.Output, args: ['lazyImageReady',] },],
    's_paginationRendered': [{ type: core_3.Output, args: ['paginationRendered',] },],
    's_scroll': [{ type: core_3.Output, args: ['scroll',] },],
    'swiperWrapper': [{ type: core_3.ViewChild, args: ['swiperWrapper',] },],
    'useSwiperClass': [{ type: core_3.HostBinding, args: ['class.swiper',] }, { type: core_3.Input },],
};
exports.SwiperComponent = SwiperComponent;
//# sourceMappingURL=swiper.component.js.map