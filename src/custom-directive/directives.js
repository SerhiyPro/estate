import Vue from 'vue'
import './directives.css'

Vue.directive('title', {
    inserted: (el, binding) => document.title = binding.value,
    update: (el, binding) => document.title = binding.value
});


Vue.directive('disable', {
    inserted: (el, binding) => {
        if (!!binding.value.disable) {
            el.disabled = true;
            el.classList.add("lock-btn");
             el.setAttribute('data-tooltip',binding.value.value?binding.value.value:'this button is disabled');
        } else {
            el.disabled = false;
            el.classList.remove("lock-btn");
             el.removeAttribute('data-tooltip')
        }
    },
    componentUpdated: (el, binding) => {
        if (!!binding.value.disable) {
            el.disabled = true;
            el.classList.add("lock-btn");
            el.setAttribute('data-tooltip',binding.value.value?binding.value.value:'this button is disabled');
        } else {
            el.disabled = false;
            el.classList.remove("lock-btn");
            el.removeAttribute('data-tooltip')
        }
    }

});
