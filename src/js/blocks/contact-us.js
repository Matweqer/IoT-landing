import $ from 'jquery'
import 'jquery-validation/dist/localization/messages_ru'
import 'jquery-validation'

import { sendEmailFromContactUs } from '../email/contact-us-form'

const contactUs = {
    options: {
        selectors: {
            sendingForm: '_sending'
        }
    },

    init () {
        this.initCache()
        this.initValidateForm()
    },

    initCache () {
        this.formValidator = null
        this.$form = $('[data-role=contact-us-form]')
        this.$formContainer = this.$form.parent('[data-role=contact-us-form-container]')
        this.$additionalInfo = this.$form.find('[data-role=additional-info]')
    },

    initValidateForm () {
        this.formValidator = this.$form.validate({
            submitHandler: async (form, event)  => {
                event.preventDefault()

                const result = new FormData(form)

                this.$formContainer.addClass(this.options.selectors.sendingForm)

                await sendEmailFromContactUs(result)

                this.$additionalInfo.show()

                this.$formContainer.removeClass(this.options.selectors.sendingForm)
            },
            onkeyup: (element) => {
                this.$additionalInfo.hide()

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
