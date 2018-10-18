<template>
    <div class="wrapper">
        <div class="content">
            <!--<header>-->
            <!--<router-link to="/">-->
            <!--<h2>Estate Seller</h2>-->
            <!--</router-link>-->
            <!--<router-link to="/estate/add/edit">-->
            <!--Add new estate-->
            <!--</router-link>-->
            <!--<button @click="logOut" style="">Log out</button>-->

            <!--</header>-->
            <!--<button @click="callAlert" style="width: 200px">-->
            <!--Click me)-->
            <!--</button>-->
            <alert v-for="(alert,index) in alerts" :style="'top:'+ (((index)) *50) +'px'" :type="alert.type"
                   :withCloseBtn="true">
                <span>{{ errorMessage }}</span>
            </alert>
            <router-view></router-view>
        </div>
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
                title: 'Home',
                alerts: []
            }
        },
        mounted() {
        },
        methods: {
            callAlert(message, type) {
                this.errorMessage = message;
                this.showAlert = true;
                let temp = Math.floor(Math.random() * 1000);
                this.alerts.push({
                    showAlert: true,
                    text: `success ${temp}`,
                });
                let length = this.alerts.length;
                // this.alerts[length - 1].type = 'success';
                // this.alerts[length - 1].type = 'danger';
                this.alerts[length - 1].type = type;
                setTimeout(() => {
                    this.alerts.splice(0, 1)

                }, 5000)
            },
        },
        created() {
        }


    }
</script>

<style>

    :root {
        --header-height: 60px;
        /*--header-bg-color: #286090;*/
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
    }

    select {
        outline: none;
    }
    .application--wrap .v-text-field__slot > input {
        color: white !important;
    }

    .application--wrap {
        min-height: unset !important;
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

    .theme--light.v-messages {
        color: #ff1f1f !important;
    }

    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .md-success {
        background-color: #73AF55 !important;
        color: #fff !important;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
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

    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
