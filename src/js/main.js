import $ from 'jquery';
import 'slick-carousel';

import animationMap from './animation-map';
import bodyResizeObserver from './body-resize-observer';

$(document).ready(() => {
    animationMap.init();
    bodyResizeObserver.init();
});
