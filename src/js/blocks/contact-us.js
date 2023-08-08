import $ from 'jquery'
import 'jquery-validation/dist/localization/messages_ru'
import 'jquery-validation'

const contactUs = {
    init () {
        this.initCache()
        this.initValidateForm()
    },

    initCache () {
        this.formValidator = null
        this.$form = $('[data-role=contact-us-form]')
    },

    initValidateForm () {
        this.formValidator = this.$form.validate({
            onkeyup: (element) => {
                clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.formValidator.element(element)
                }, 150);
            },
            rules: {
                'contact-us-form-name': {
                    required: true,
                },
                'contact-us-form-email': {
                    required: true,
                    email: true
                },
                'contact-us-form-textarea': {
                    required: true,
                    minlength: 50,
                },
            }
        })
    },
}

export default contactUs
