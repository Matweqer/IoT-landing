/* eslint-disable complexity */

import $ from 'jquery';

const isInViewPort = ($elem, reserve = 100) => {
    const $window = $(window);

    const viewportTop = $window.scrollTop();
    const viewportBottom = viewportTop + $window.height();

    const elementTop = $elem.offset().top;
    const elementBottom = elementTop + $elem.outerHeight();

    return (
        (elementBottom < viewportBottom && elementTop > viewportTop) ||
        (elementBottom > viewportBottom && elementTop < viewportTop) ||
        (elementBottom < viewportBottom && elementTop + reserve > viewportTop) ||
        (elementBottom - reserve < viewportBottom && elementTop > viewportTop)
    );
};

export default isInViewPort;
