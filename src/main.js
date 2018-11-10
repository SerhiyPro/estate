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
        alerts: [],
        loader: {
            progress: 0,
            timeId: null,
            show: false,
            color: '#73AF55'
        }
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

        },
        progress(status) {
            let n = 0;
            this.loader.color = '#73AF55';
            clearTimeout(this.loader.timeId);
            if (status === 'start') {
                this.loader.show = true;
                this.loader.progress = 1;
                this.loader.timeId = setInterval(() => {
                    n += 1;
                    this.loader.progress += 3 / n ** (1 / 2);
                    if (this.loader.progress > 90) {
                        clearTimeout(this.loader.timeId);
                    }
                }, 100)
            } else if (status === 'done') {
                setTimeout(() => {
                    this.loader.show = false
                }, 1000);
                this.loader.progress = 100
            } else {
                setTimeout(() => {
                    this.loader.show = false
                }, 1000);
                this.loader.progress = 100;
                this.loader.color = '#ff0300'
            }
        },
    }
});
