<template>
    <div>
        <v-app id="inspire">
            <v-layout row>
                <v-flex>
                    <v-card-title class="blue header">
                        <router-link to="/" style="text-decoration: none;">
                            <img class="logo" src="../assets/images/logo.png">
                        </router-link>
                        <v-spacer></v-spacer>
                        <v-form @click.prevent="">
                            <v-text-field
                                    v-model="search"
                                    label="Пошук"
                            ></v-text-field>
                        </v-form>
                        <v-menu bottom left>
                            <v-btn
                                    slot="activator"
                                    dark
                                    icon
                            >
                                <v-icon>more_vert</v-icon>
                            </v-btn>

                            <v-list>
                                <v-list-tile v-for="(item, i) in menuOptions"
                                             :key="i" @click="goTo(item)">
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-app>
        <router-view :search-value="['/','/estates'].includes($route.path)? search: ''"></router-view>
    </div>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                search: '',
                menuOptions: [
                    {title: 'Додому', call: 'goHome'},
                    {title: 'Перегляд усієї нерухомісті', call: 'seeAllEstates'},
                    {title: 'Додати нову будівлю', call: 'addNewEstate'},
                    {title: 'Вийти', call: 'logOut'}
                ],
            }
        },
        methods: {
            goTo(item) {
                this[item.call]();
            },
            goHome() {
                this.$router.push('/');
            },
            seeAllEstates() {
                this.$router.push('/estates');
            },
            addNewEstate() {
                this.$router.push('/estate/add')
            },
            logOut() {
                localStorage.removeItem('authorized');
                this.$router.push('/login');
            }
        },
        mounted() {
        },
        computed: {},
        watch: {
            search() {
                if (this.search.length >= 3) {
                    this.$router.push('/estates');
                }
            }
        },
        created() {
        }


    }
</script>

<style scoped>
    .logo {
        height: 50px;
        width: 50px;
    }

    .link-text {
        color: white;
        font-size: 20px;
    }
</style>
