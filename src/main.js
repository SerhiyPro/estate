import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import sh from 'shuffle-array';

import App from './App'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";

import './custom-directive/directives.js'

import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.css'

import './assets/css/fonts-matirial.css'
import  './assets/css/font-ubuntu.css'

import './custom-directive/directives.js'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

Vue.use(VueResource);

Vue.use(Vuetify, {
    theme: {
        primary: "red",
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
    }
});

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyAPXsXhFoz1pOqKqpPHXISxdb-5U7WAxC8",
        libraries: "places"
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
