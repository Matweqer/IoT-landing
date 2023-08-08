import $ from 'jquery';
import 'slick-carousel';

import animationMap from './animation-map';
import bodyResizeObserver from './body-resize-observer';
import contactUs from './blocks/contact-us';
import scrollToSection from "./scroll-to-section";

$(document).ready(() => {
    contactUs.init();
    scrollToSection.init();
    animationMap.init();
    bodyResizeObserver.init();
});
