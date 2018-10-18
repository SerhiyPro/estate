<template>
    <div>
        <v-app id="inspire">
            <v-layout row>
                <v-flex>
                    <v-card-title class="blue" style="height: 70px">
                        <router-link to="/" style="text-decoration: none"><span class="headline">Home</span></router-link>
                        <v-spacer></v-spacer>
                        <v-form  @click.prevent="">
                            <v-text-field
                                    v-model="search"
                                    label="Search"
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
        <estates :search-value="search"></estates>
        <router-view></router-view>
    </div>
</template>

<script>

    // import Popup from './custom-components/popup.vue'
    export default {
        // components: {Popup, alert, DonutChart, LineChart, BubbleChart, MaterialInput, TopProgress, PopupEvent},
        name: 'home',
        data() {
            return {
                search: '',
                menuOptions: [
                    {title: 'See all estates', call: 'seeAllEstates'},
                    {title: 'Add new estate', call: 'addNewEstate'},
                    {title: 'Log out', call: 'logOut'}
                ],
            }
        },
        methods: {
            goTo(item) {
                this[item.call]();
            },
            seeAllEstates() {
                this.$router.push('/estates');
            },
            addNewEstate() {
                this.$router.push('/estate/add/edit')
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
            search: function () {
                if(this.search.length >= 3) {
                    this.$router.push('/estates');
                }
            }
        },
        created() {
        }


    }
</script>

<style scoped>


</style>
