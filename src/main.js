import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'

import VueMaterial from 'vue-material'

// import 'vue-material/dist/theme/default.css'
import './custom-directive/directives.js'

import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.css'

import './assets/css/fonts-matirial.css'
// import './assets/css/material-cards.css'
import './assets/css/roboto.css'
// import 'vue-material/dist/vue-material.css'


// import './assets/css/css.css'

import VueCookies from 'vue-cookies'
import Autocomplete from 'v-autocomplete'
import vueTopprogress from 'vue-top-progress'
import './custom-directive/directives.js'

Vue.use(vueTopprogress);
Vue.use(Autocomplete);
// Vue.use(VueMaterial);
Vue.use(VueCookies);


Vue.use(VueResource);

Vue.use(Vuetify, {
    theme: {
        primary: "red",
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
    }
});

new Vue({


    el: '#app',
    router,
    data: {
        title: 'This will be the title',
        baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8008',
    },
    template: '<App/>',
    components: {
        App
    },
    methods: {}
});
