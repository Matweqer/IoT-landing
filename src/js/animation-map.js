/*
 * TODO подумать над обратным ходом анимации + оставила delay только для scrollDirection 'down'
 * TODO выравнивать лендос, если нужен переход на другую секцию, а блок с лендигом проскролился
 */

import ScrollObserver from './scroll-observer';
import loadImages from './load-images';
import navigation from './blocks/navigation';

const animationMap = {
    activeStateInd: 0,
    defaultDelay: 0,
    isUpdating: false,
    updatingDelay: 1000,
    body: document.getElementsByTagName('body')[0],
    map: [
        {
            sectionName: 'safety-section',
            classesMap: [
                { selector: '[data-role="main-content"]', classList: ['safety-section'] },
                { selector: '[data-role="products"]', classList: ['products-preview'] },
            ],
        },
        {
            sectionName: 'info-product-section',
            relatedSelectors: ['[data-role="info-product"]', '[data-role="partners"]'],
            classesMap: [
                { selector: '[data-role="main-content"]', classList: ['info-product-section'] },
                { selector: '[data-role="safety"]', classList: ['safety-viewed'] },
                { selector: '[data-role="info-product"]', classList: ['info-product-show'] },
            ],
        },
        {
            sectionName: 'suggestions-section',
            relatedSelectors: ['[data-role="partners"]'],
            classesMap: [
                { selector: '[data-role="main-content"]', classList: ['suggestions-section'] },
                { selector: '[data-role="safety"]', classList: ['safety-viewed'] },
                { selector: '[data-role="info-product"]', classList: ['info-product-viewed'] },
                { selector: '[data-role="suggestions"]', classList: ['suggestions-show'] },
            ],
        },
        {
            sectionName: 'partners-section',
            relatedSelectors: ['[data-role="contact-us"]'],
            classesMap: [
                { selector: '[data-role="main-content"]', classList: ['partners-section'] },
                { selector: '[data-role="safety"]', classList: ['safety-viewed'] },
                { selector: '[data-role="info-product"]', classList: ['info-product-viewed'] },
                { selector: '[data-role="suggestions"]', classList: ['suggestions-viewed'] },
                { selector: '[data-role="partners"]', classList: ['partners-show'] },
            ],
        },
        {
            sectionName: 'contact-us-section',
            relatedSelectors: ['[data-role="contact-us"]'],
            classesMap: [
                { selector: '[data-role="main-content"]', classList: ['contact-us-section'] },
                { selector: '[data-role="safety"]', classList: ['safety-viewed'] },
                { selector: '[data-role="info-product"]', classList: ['info-product-viewed'] },
                { selector: '[data-role="suggestions"]', classList: ['suggestions-viewed'] },
                { selector: '[data-role="partners"]', classList: ['partners-viewed'] },
                { selector: '[data-role="contact-us"]', classList: ['contact-us-show'] },
            ],
        },
    ],

    init() {
        this.setClasses(this.map[this.activeStateInd]);
        this.loadNextSectionImages();
        this.observeScroll();
    },

    observeScroll() {
        this.scrollObserver = new ScrollObserver({
            isPreventDefault: true,
            excludeSelector: '[data-scroll-observer-exclude]',
        });
        this.scrollObserver.init();

        this.body.addEventListener('scroll:up', () => {
            this.goPrev();
        });

        this.body.addEventListener('scroll:down', event => {
            const sectionName = event?.detail?.section;
            const isWithoutDelay = event?.detail?.isWithoutDelay || false;

            const indexSection = this.map.findIndex(section => section.sectionName === sectionName);

            if (indexSection === this.activeStateInd) {
                return;
            }

            this.goNext(indexSection, isWithoutDelay);
        });
    },

    /* eslint complexity: ["error", 7]*/
    updateState(prevStateInd, newStateInd, scrollDirection, isWithoutDelay) {
        const newState = this.map[newStateInd];

        if (!newState || this.isUpdating) {
            return;
        }

        const delay = newState.delay && newState.delay[scrollDirection] && !isWithoutDelay
            ? newState.delay[scrollDirection]
            : this.defaultDelay;
        const eventDetails = {
            detail: {
                delay,
            },
        };
        const { event } = newState;

        if (event) {
            this.body.dispatchEvent(new CustomEvent(event));
        }

        clearTimeout(this.timeout);
        this.isUpdating = true;

        setTimeout(() => {
            this.activeStateInd = newStateInd;
            const prevState = this.map[prevStateInd];

            this.resetClasses(prevState);
            this.setClasses(newState, scrollDirection);
            this.body.dispatchEvent(new CustomEvent('state:updated', eventDetails));
            this.loadNextSectionImages();

            navigation.updateNavigation(newState.sectionName);

            this.timeout = setTimeout(() => {
                this.isUpdating = false;
            }, this.updatingDelay);
        }, delay);
    },

    setClasses(state, scrollDirection) {
        const classes = scrollDirection === 'up' && state.reverseClassesMap ? state.reverseClassesMap : state.classesMap;

        classes.forEach(({ selector, classList }) => {
            const elem = document.querySelector(selector);

            if (elem) {
                elem.classList.add(...classList);
            }
        });
    },

    resetClasses(state) {
        const { classesMap = [], reverseClassesMap = [] } = state;

        [...classesMap, ...reverseClassesMap].forEach(({ selector, classList }) => {
            const elem = document.querySelector(selector);

            if (elem) {
                elem.classList.remove(...classList);
            }
        });
    },

    loadNextSectionImages() {
        const currentSection = this.map[this.activeStateInd];
        const nextSection = this.map[this.activeStateInd + 1];
        const isLastSection = this.activeStateInd + 1 === this.map.length;

        if (!nextSection || nextSection.sectionName === currentSection.sectionName) {
            if (isLastSection) {
                currentSection.relatedSelectors.forEach(selector => {
                    loadImages(selector);
                });
            }

            return;
        }

        nextSection.relatedSelectors.forEach(selector => {
            loadImages(selector);
        });
    },

    goNext(index, isWithoutDelay) {
        const activeStateIndex = index === -1 ? this.activeStateInd + 1 : index;

        this.updateState(this.activeStateInd, activeStateIndex, 'down', isWithoutDelay);
    },

    goPrev() {
        this.updateState(this.activeStateInd, this.activeStateInd - 1, 'up', false);
    },

    updateNavigation () {

    },
};

export default animationMap;
