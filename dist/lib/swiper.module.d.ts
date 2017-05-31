import { ModuleWithProviders, OpaqueToken } from "@angular/core";
import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';
export declare const SWIPER_GUARD: OpaqueToken;
export declare const SWIPER_CONFIG: OpaqueToken;
export declare class SwiperModule {
    constructor(guard: any);
    static forRoot(config: SwiperConfigInterface): ModuleWithProviders;
    static forChild(): ModuleWithProviders;
}
export declare function provideForRootGuard(config: SwiperConfig): any;
export declare function provideDefaultConfig(config: SwiperConfigInterface): SwiperConfig;
