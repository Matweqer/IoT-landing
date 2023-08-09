import $ from 'jquery';
import 'slick-carousel';

import animationMap from './animation-map';
import bodyResizeObserver from './body-resize-observer';
import contactUs from './blocks/contact-us';
import scrollToSection from './scroll-to-section';
import navigation from './blocks/navigation';
import { breakpoints, matchMedia } from './utils/match-media';
import loadImages from './load-images';

$(document).ready(() => {
    contactUs.init();

    if (matchMedia.from(breakpoints.tabletHorizontal)) {
        navigation.init()
        scrollToSection.init();
        animationMap.init();
        bodyResizeObserver.init();
    }

    if (matchMedia.till(breakpoints.tabletHorizontal)) {
        loadImages(document.body);
    }
});
