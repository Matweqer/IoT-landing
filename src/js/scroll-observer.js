/*
 * TODO добавить скрол по кнопке
 */

function ScrollObserver({
    element = document.getElementsByTagName('body')[0],
    excludeSelector,
    eventKey = '',
    isPreventDefault = false,
    isStopPropagation = false,
    sensitivityY = 150,
    sensitivityX = 100,
    delay = 10,
} = {}) {
    return {
        element: typeof element === 'string' ? document.querySelector(element) : element,
        excludeSelector,
        eventKey,
        isPreventDefault,
        isStopPropagation,
        sensitivityY,
        sensitivityX,
        delay,
        touchStartPositionY: 0,
        touchStartPositionX: 0,
        totalDeltaY: 0,
        totalDeltaX: 0,
        events: ['wheel', 'touchstart', 'touchmove', 'touchend'],

        init() {
            this.initObserver();
        },

        initObserver() {
            this.element.addEventListener('keydown', event => {
                if (event.key === 'ArrowUp') {
                    this.debouncedTriggerScroll(this.sensitivityY + 1, 0);
                } else if (event.key === 'ArrowDown') {
                    this.debouncedTriggerScroll(-this.sensitivityY - 1, 0);
                }
            });

            this.element.addEventListener('wheel', event => {
                if (this.isPreventDefault) {
                    event.preventDefault();
                }

                if (this.isStopPropagation) {
                    event.stopPropagation();
                }

                this.debouncedTriggerScroll(event.deltaY, event.deltaX);
            }, { passive: false });

            this.element.addEventListener('touchstart', event => {
                this.touchStartPositionY = event.touches[0].clientY;
                this.touchStartPositionX = event.touches[0].clientX;
            }, { passive: false });

            this.element.addEventListener('touchmove', event => {
                if (this.isPreventDefault) {
                    event.preventDefault();
                }

                if (this.isStopPropagation) {
                    event.stopPropagation();
                }

                const currentX = event.changedTouches[0].clientX;

                if (Math.abs(this.touchStartPositionX - currentX) > this.sensitivityX) {
                    this.isDisabledVerticalScroll = true;
                }
            }, { passive: false });

            this.element.addEventListener('touchend', event => {
                const currentY = event.changedTouches[0].clientY;
                const currentX = event.changedTouches[0].clientX;
                const deltaY = this.touchStartPositionY - currentY;
                const deltaX = this.touchStartPositionX - currentX;

                this.debouncedTriggerScroll(deltaY, deltaX);
            }, { passive: false });

            this.excludeElements();
        },

        excludeElements() {
            if (!this.excludeSelector) {
                return;
            }

            this.element
                .querySelectorAll(this.excludeSelector)
                .forEach(this.excludeElement.bind(this));
        },

        excludeElement(excludedElement) {
            this.events.forEach(eventName => {
                excludedElement.addEventListener(eventName, event => {
                    event.stopPropagation();
                }, { passive: false });
            });
        },

        debouncedTriggerScroll(deltaY, deltaX) {
            clearTimeout(this.timeout);

            this.totalDeltaY += deltaY;
            this.totalDeltaX += deltaX;
            this.eventDetails = {
                detail: {
                    delay: this.delay,
                },
            };

            this.timeout = setTimeout(() => {
                this.triggerScroll(this.totalDeltaY, this.totalDeltaX);

                this.totalDeltaY = 0;
                this.totalDeltaX = 0;
                this.isDisabledVerticalScroll = false;
            }, this.delay);
        },

        triggerScroll(deltaY, deltaX) {
            const isVerticalScroll = Math.abs(deltaY) < this.sensitivityY ||
                Math.abs(deltaY) < Math.abs(deltaX);

            if (isVerticalScroll || this.isDisabledVerticalScroll) {
                return;
            }

            const eventKeyString = this.eventKey ? `:${this.eventKey}` : '';

            this.detectScrollDirection(deltaY, eventKeyString);
        },

        detectScrollDirection(deltaY, eventKeyString) {
            if (deltaY < 0) {
                this.element.dispatchEvent(new CustomEvent(`scroll:up${eventKeyString}`, this.eventDetails));
            } else if (deltaY > 0) {
                this.element.dispatchEvent(new CustomEvent(`scroll:down${eventKeyString}`, this.eventDetails));
            }
        },
    };
}


export default ScrollObserver;
