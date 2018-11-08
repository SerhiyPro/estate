<template>
    <div>
        <v-layout wrap align-center>
            <v-layout row>
                <v-flex>
                    <v-card-title class="blue header">
                        <router-link to="/" style="text-decoration: none;">
                            <img class="logo" src="../assets/images/logo.png">
                        </router-link>
                        <v-spacer></v-spacer>
                        <v-form @click.prevent="">
                            <v-text-field
                                    class="search"
                                    v-model="search"
                                    label="Пошук"
                            ></v-text-field>
                            <v-icon class="search-icon">search</v-icon>
                        </v-form>
                        <v-menu bottom left style="margin-left: 10px">
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
            <v-container fluid >
                <router-view :search-value="['/','/estates'].includes($route.path)? search: ''"></router-view>
            </v-container>
        </v-layout>
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

    .search {
        position: relative;
    }
    @media screen and (max-width: 480px){
        .search{
            max-width: 120px;
        }
    }

    .search-icon {
        position: absolute;
        top: 22px;
        right: 60px;
    }
</style>
