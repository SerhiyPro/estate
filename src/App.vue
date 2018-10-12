<template>
    <div class="wrapper">
        <div class="content">
            <header>
                <router-link to="/">
                <h2>Estate Seller</h2>
                </router-link>
                <router-link to="/estate/add/edit">
                    Add new estate
                </router-link>
                    <button @click="logOut" style="">Log out</button>

                <v-form v-model="valid">
                    <v-text-field
                            v-model="search"
                            :rules="nameRules"
                            :counter="10"
                            label="Name"
                            required
                    ></v-text-field>
                </v-form>

            </header>
            <router-view ></router-view>
        </div>
        <div class="footer"></div>

    </div>
</template>

<script>


    import router from './router'


    export default {
        components: {},


        name: 'app',
        router,
        data() {
            return {
                search: '',
                title: 'Home',
            }
        },
        mounted() {},
        methods: {
            logOut() {
                localStorage.removeItem('authorized');
                this.$router.push('/login');
            }
        },
        created() {}


    }
</script>

<style>

    :root {
        --header-height: 60px;
        --header-bg-color: #286090;
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
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).success{
        background-color: var(--success-color) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).primary{
        background-color: var(--primary-color) !important;
    }
    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).error{
        background-color: var(--danger-color) !important;
    }
    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).warning{
        background-color: var(--warning-color) !important;
    }

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).secondary{
        background-color: var(--side-bg-color) !important;
    }
    .theme--light.v-messages{
        color: #ff1f1f !important;
    }
    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    header{
        height: 60px;
        width: 100%;
        background: #1453ff;
        display: flex;
        align-items: center;
        padding: 0 20px;
        color: #fff;
        font-size: 22px;
    }
    .md-success{
        background-color:#73AF55 !important;
        color: #fff !important;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .content {
        flex: 1 0 auto;
    }
    h2{
        text-align: center;
        /*color: #343434;*/
    }
    .footer {
        flex: 0 0 auto;
    }
    [data-tooltip] {
        position: relative;
        z-index: 2;
        cursor: pointer;
    }


</style>
