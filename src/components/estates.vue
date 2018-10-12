<template>
    <div class="main">
        <v-layout>
            <label>utiuti<input v-model="search"></label>

            <div class="card-div-style">
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
        </v-layout>
    </div>
</template>

<script>
    // import Popup from './custom-components/popup.vue'
    // import VInput from "vuetify/src/components/VInput/VInput";
    export default {
        // components: {Popup, alert, DonutChart, LineChart, BubbleChart, MaterialInput, TopProgress, PopupEvent},
        name: 'estates',
        // components: {VInput},
        data() {
            return {
                estatesAreFetched: false,
                estates: [],
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
                    console.log(error)
                });
            },
        },
        mounted() {
        },
        computed: {
            filteredEstates() {
                let estates = [],
                    fieldsForSearch = ['city', 'name', 'description', 'housetype',
                        'house', 'street', 'flat', 'flooring', 'layout', 'repair', 'roomtype', 'heating'];
                estates = this.estates.filter(estate => {
                    for (let field of fieldsForSearch) {
                        if (estate[field]) {
                            if (estate[field].toLowerCase().includes(this.search.toLowerCase())) {
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
</style>
