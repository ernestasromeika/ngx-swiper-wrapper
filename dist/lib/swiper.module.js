"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var swiper_component_1 = require("./swiper.component");
var swiper_directive_1 = require("./swiper.directive");
var swiper_interfaces_1 = require("./swiper.interfaces");
exports.SWIPER_GUARD = new core_1.OpaqueToken('SWIPER_GUARD');
exports.SWIPER_CONFIG = new core_1.OpaqueToken('SWIPER_CONFIG');
var SwiperModule = (function () {
    function SwiperModule(guard) {
    }
    SwiperModule.forRoot = function (config) {
        return {
            ngModule: SwiperModule,
            providers: [
                {
                    provide: exports.SWIPER_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [
                        [
                            swiper_interfaces_1.SwiperConfig,
                            new core_1.Optional(),
                            new core_1.SkipSelf()
                        ]
                    ]
                },
                {
                    provide: exports.SWIPER_CONFIG,
                    useValue: config ? config : {}
                },
                {
                    provide: swiper_interfaces_1.SwiperConfig,
                    useFactory: provideDefaultConfig,
                    deps: [
                        exports.SWIPER_CONFIG
                    ]
                }
            ]
        };
    };
    SwiperModule.forChild = function () {
        return {
            ngModule: SwiperModule
        };
    };
    return SwiperModule;
}());
SwiperModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [swiper_component_1.SwiperComponent, swiper_directive_1.SwiperDirective],
                exports: [common_1.CommonModule, swiper_component_1.SwiperComponent, swiper_directive_1.SwiperDirective]
            },] },
];
/** @nocollapse */
SwiperModule.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.SWIPER_GUARD,] },] },
]; };
exports.SwiperModule = SwiperModule;
function provideForRootGuard(config) {
    if (config) {
        throw new Error("\n      Application called SwiperModule.forRoot() twice.\n      For submodules use SwiperModule.forChild() instead.\n    ");
    }
    return 'guarded';
}
exports.provideForRootGuard = provideForRootGuard;
function provideDefaultConfig(config) {
    return new swiper_interfaces_1.SwiperConfig(config);
}
exports.provideDefaultConfig = provideDefaultConfig;
//# sourceMappingURL=swiper.module.js.map