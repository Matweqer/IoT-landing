import $ from 'jquery'

const navigation = {
    options: {
        classes: {
            active: '_active',
        },
    },

    init () {
        this.initCache()
    },

    initCache () {
        this.$navigationMenu = $('[data-role="page-navigation"]')
    },

    updateNavigation (sectionName) {
        const { classes } = this.options

        this.$navigationMenu.children('[data-navigation-item]').removeClass(classes.active)
        this.$navigationMenu.find(`[data-anchor-section-name=${sectionName}]`).addClass(classes.active)
    }
}

export default navigation
