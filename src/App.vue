<template>
    <div>
        <alert v-for="(alert,index) in $root.alerts" :key="index" :style="'top:'+ (((index)) *50) +'px'"
               :type="alert.type"
               :withCloseBtn="true">
            <span>{{ alert.text }}</span>
        </alert>
        <v-app id="inspire">
            <router-view></router-view>
        </v-app>
    </div>
</template>

<script>

    import router from './router'
    import alert from './components/alert.vue'

    export default {
        components: {alert},

        name: 'app',
        errorMessage: '',
        router,
        data() {
            return {
                title: 'Home'
            }
        },
        mounted() {
        },
        methods: {},
        created() {
        }


    }
</script>

<style>
    html, body {
        height: 100%;
        min-height: 100%;
    }

    body > div, body > div > div.application {
        min-height: inherit;
    }

    body > div > div.centered-main > div.application--wrap {
        height: inherit;
        min-height: inherit;
    }

    :root {
        --main-bg-color: #fafafa;
        --side-bg-color: #5a618e;
        --side-text-color-small: #454242;
        --side-text-color: #fff;
        --primary-color: #286090;
        --danger-color: #ff5733;
        --warning-color: #F8BB86;
        --success-color: #73AF55;
        --bg-color-card-admin: #b8b8b938;
        --border-title-color: #000;
        --header-color: #2196f3;
        --header-height: 70px;
    }

    .primary--text {
        color: black !important;
    }

    .v-text-field.v-input--is-focused .v-input__slot:after {
        color: var(--header-color);
    }

    .header .v-text-field.v-input--is-focused .v-input__slot:after {
        color: white;
    }

    .header {
        height: var(--header-height);
    }

    select {
        outline: none;
    }

    .header .theme--light.v-input:not(.v-input--is-disabled) input {
        color: white !important;
    }

    .header .theme--light.v-input:not(.v-input--is-disabled) label {
        color: rgba(0, 0, 0, 0.87) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).success {
        background-color: var(--success-color) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).primary {
        background-color: var(--primary-color) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).error {
        background-color: var(--danger-color) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).warning {
        background-color: var(--warning-color) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).secondary {
        background-color: var(--side-bg-color) !important;
    }

    .v-list__tile__content div.v-list__tile__title {
        color: black !important;
        caret-color: black !important;
    }

    .v-list__tile--active .v-list__tile__content div.v-list__tile__title {
        color: #6aa1e3 !important;
    }

    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: 'Ubuntu', sans-serif;
    }

    .md-success {
        background-color: #73AF55 !important;
        color: #fff !important;
    }

    h2 {
        text-align: center;
    }

    .footer {
        flex: 0 0 auto;
    }

    [data-tooltip] {
        position: relative;
        z-index: 2;
        cursor: pointer;
    }

    .VueCarousel-slide {
        position: relative;
        min-height: 100px;
        text-align: center;
    }

    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .container {
        padding: 0 !important;
    }

    .header .v-text-field__slot {
        flex: unset;
        flex-direction: row-reverse;
        justify-content: flex-end;
        width: calc(100% - 28px) !important;
    }

    .v-text-field__slot > label, .v-select__slot > label {
        color: rgba(140, 140, 140, 1) !important;
    }

</style>
