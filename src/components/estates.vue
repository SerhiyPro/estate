<template>
    <div class="main">
        <v-layout>
            <div v-if="loaded" style="width: 100%">
                <div class="card-div-style" v-if="filteredEstates.length">
                    <v-card :hover="true" class="estate-card" v-for="estate in filteredEstates">
                        <router-link :to="'estate/' + estate.id">
                            <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                    height="150px"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title>
                                <div style="color: black">
                                    <h3 class="headline mb-0">Квартира {{ estate.flat }}</h3>
                                    <p style="margin-top: 5px"><b>Поверх:</b> {{ estate.floor }} <br>
                                        <b>Тип будинку:</b> {{ estate.housetype }} <br>
                                        <b>Умеблювання:</b> {{ estate.furniture }} <br>
                                        <b>Тип кімнат:</b> {{ estate.roomstype }}
                                    </p>
                                    <p>
                                        <b>Розташування:</b> вул. {{ estate.street }}, {{ estate.city }}
                                    </p>
                                </div>
                            </v-card-title>
                        </router-link>
                    </v-card>
                </div>
                <div v-else style="text-align: center; width: 100%">
                    Estate is not found, <router-link to="/estate/add/edit" class="custon-link"><strong>but you can add a new one</strong></router-link>
                </div>
            </div>
            <div v-else>
                Loading...
            </div>
        </v-layout>
    </div>
</template>

<script>
    // import Popup from './custom-components/popup.vue'
    // import VInput from "vuetify/src/components/VInput/VInput";
    export default {
        // components: {Popup, alert, DonutChart, LineChart, BubbleChart, MaterialInput, TopProgress, PopupEvent},
        name: 'estates',
        props: ['searchValue'],
        data() {
            return {
                estatesAreFetched: false,
                estates: [],
                loaded: false,
                search: ''
            }
        },
        methods: {
            fetchTheData() {
                this.$http.get('http://lab.kids-lu-server.xyz/api/v1/realty', {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                }).then(function (response) {
                    // Success

                    this.estates = response.data.list;
                    this.estatesAreFetched = true;
                    console.log(this.estates);
                }).catch(error => {
                    console.log(error);
                    this.$parent.$parent.callAlert('Network error occured', 'danger');
                }).finally(() => {
                    this.loaded = true;
                });
            },
        },
        mounted() {
        },
        computed: {
            filteredEstates() {
                let estates = [],
                    fieldsForSearch = ['city', 'name', 'description', 'housetype', 'furniture',
                        'house', 'street', 'flat', 'flooring', 'layout', 'repair', 'roomstype', 'heating'];
                console.log(this.searchValue);
                estates = this.estates.filter(estate => {
                    for (let field of fieldsForSearch) {
                        if (estate[field]) {
                            if (estate[field].toLowerCase().includes(this.$parent.search.toLowerCase())) {
                            // if (estate[field].toLowerCase().includes(this.searchValue.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                return estates;
            }
        },
        watch: {},
        created() {
            this.fetchTheData();
        }
    }
</script>

<style scoped>
    .main {
        margin-top: 30px;
    }

    a:link {
        text-decoration: none;
    }

    .card-div-style {
        display: flex;
        flex-wrap: wrap;
        justify-content: center
    }

    .estate-card {
        width: 300px;
        margin: 5px;
    }

    .custon-link {
        color: var( --header-color);
    }
</style>
