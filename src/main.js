import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import sh from 'shuffle-array';

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

Array.prototype.shuffle = function() {
    return sh(this);
};
Array.prototype.picker = function (num) {
    return sh.pick(this, {'picks': num});
};

new Vue({

    el: '#app',
    router,
    data: {
        title: 'This will be the title',
        apiUrl:'http://lab.kids-lu-server.xyz/api/v1',
        alerts: []
    },
    template: '<App/>',
    components: {
        App
    },
    methods: {
        callAlert(text, type) {
            this.alerts.push({
                showAlert: true,
                text,
                type,
                timeoutId: setTimeout(() => {
                    clearTimeout(this.alerts[0].timeoutId);
                    this.alerts.shift();
                }, 5000)
            });

        }
    }
});
