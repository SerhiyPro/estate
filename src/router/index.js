import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import Login from '@/components/login'
import Estates from '@/components/estates'
import Estate from '@/components/estate'
import Search from '@/components/advSearch'
import EditAndAdd from '@/components/edit-add'

import VueLocalStorage from 'vue-localstorage'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.use(VueLocalStorage);
Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '',
                    component: Estates
                },
                {
                    path: 'estates',
                    name: 'estates',
                    component: Estates
                },
                {
                    path: '/estate/:id',
                    name: 'estate',
                    component: Estate
                },
                {
                    path: '/estate/:id/edit',
                    name: 'estate_edit',
                    component: EditAndAdd
                },
                {
                    path: '/search',
                    name: 'search',
                    component: Search
                }
            ],
            alias: 'estates',
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem('authorized') || localStorage.getItem('authorized') === 'null' ||
                    localStorage.getItem('authorized') === '') {
                    next('/login');
                } else {
                    next();
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('authorized')) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path:'*',
            redirect:"/"
        }
    ]
});
