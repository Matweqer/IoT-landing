import $ from 'jquery';

const bodyResizeObserver = {
    $body: $('body'),
    $window: $(window),
    width: null,
    timeout: null,
    delay: 300,

    init() {
        this._bindEvents();
        this._checkState();
    },

    _bindEvents() {
        this.$window.on('resize', this._onResize.bind(this));
    },

    _checkState() {
        this.width = this._getWidth();
    },

    _onResize() {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            if (this.width !== this._getWidth()) {
                this.$body.trigger('resize-body');
                this._checkState();
            }
        }, this.delay);
    },

    _getWidth() {
        return window.innerWidth ? window.innerWidth : this.$window.width();
    },
};

export default bodyResizeObserver;
