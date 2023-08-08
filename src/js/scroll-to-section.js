import $ from 'jquery';

const scrollToSection = {
    selectors: {
        anchorSection: '[data-role=anchor-section]',
    },

    init() {
        this.initCache();
        this.bindEvents();
    },

    initCache() {
        this.$body = $('body');
    },

    bindEvents() {
        this.$body.on('click', this.selectors.anchorSection, this.onAnchorSectionClick.bind(this));
    },

    onAnchorSectionClick(event) {
        const $target = $(event.currentTarget);
        const anchorSectionName = $target.data('anchor-section-name');

        this.$body[0].dispatchEvent(new CustomEvent('scroll:down', {
            detail: {
                section: anchorSectionName,
                isWithoutDelay: true,
            },
        }));
    },
};

export default scrollToSection;
