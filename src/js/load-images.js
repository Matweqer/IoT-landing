import $ from 'jquery';

const loadImages = selector => {
    const $container = $(selector);
    const lazyAttribute = 'data-lazy';

    $container.find(`img[${lazyAttribute}]`).each((_, image) => {
        const $image = $(image);
        const src = $image.attr('data-src');

        if (src) {
            $image.attr('src', src).attr(lazyAttribute, null);
        }
    });

    $container.find(`source[${lazyAttribute}]`).each((_, source) => {
        const $source = $(source);
        const srcset = $source.attr('data-srcset');

        if (srcset) {
            $source.attr('srcset', srcset).attr(lazyAttribute, null);
        }
    });
};

export default loadImages;
