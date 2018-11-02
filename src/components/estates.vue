<template>
    <div>
        <advanced-search v-on:advSearch="advancedSearch"></advanced-search>
        <v-layout>
            <section v-if="loaded" style="width: 100%">
                <div class="card-div-style" v-if="filteredEstates.length">
                    <v-card :hover="true" class="estate-card" v-for="estate in filteredEstates">
                        <router-link :to="'estate/' + estate.id">
                            <v-img
                                    :src="estatesImages[`0x${estate.id}`%10]"
                                    height="150px"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title>
                                <div style="color: #000000">
                                    <h3 class="headline mb-0">Квартира {{ estate.flat }}</h3>
                                    <p class="cart-content"><b>Поверх:</b> {{ estate.floor }} <br>
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
                <section v-else style="text-align: center; width: 100%">
                    Будівля не знайдена,
                    <router-link to="/estate/add" class="custon-link"><strong>але ви можете додати нову</strong>
                    </router-link>
                </section>
            </section>
            <section v-else>
                Завантаження...
            </section>
        </v-layout>
    </div>
</template>

<script>
    import advancedSearch from './advSearch';
    import {estates} from "../assets/images";

    export default {
        components: {advancedSearch},
        name: 'estates',
        props: ['searchValue'],
        data() {
            return {
                estatesAreFetched: false,
                estates: [],
                estatesImages: estates,
                loaded: false,
                search: '',
                params: {},
                isAdvancedSearch: false
            }
        },
        methods: {
            fetchTheData() {
                this.$http.get(`${this.$root.apiUrl}/realty`, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                }).then(function (response) {
                    // Success

                    this.estates = response.data.list;
                    this.estatesAreFetched = true;
                    // console.log(this.estates); // to check whether data was correct
                }).catch(error => {
                    console.log(error);
                    this.$root.callAlert('Проблема з\'єднання з сервером', 'danger');
                }).finally(() => {
                    this.loaded = true;
                });
            },
            advancedSearch(params) {
                this.params = params;
                this.isAdvancedSearch = true;
            }
        },
        mounted() {
            document.title = 'Estates';
        },
        computed: {
            filteredEstates() {
                let estates = [];
                let fieldsForSearch = ['city', 'name', 'description', 'housetype', 'furniture',
                    'house', 'street', 'flat', 'flooring', 'layout', 'repair', 'roomstype', 'heating'];

                if (this.isAdvancedSearch) {
                    estates = this.estates.filter(estate => {
                        for (let field of Object.keys(this.params)) {
                            if (estate[field] && this.params[field]) {
                                if (typeof (estate[field]) !== 'number') {
                                    if (!estate[field].toLowerCase().includes(this.params[field].toLowerCase())) {
                                        return false;
                                    }
                                }
                                else if (!(estate[field] === +this.params[field])) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    });
                } else {
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
                }
                return estates;

            }
        },
        watch: {
            searchValue() {
                this.isAdvancedSearch = false;
                this.search = this.searchValue;
            }
        },
        created() {
            this.fetchTheData();
        }
    }
</script>

<style scoped>

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
        color: var(--header-color);
    }

    .cart-content {
        margin-top: 5px;
        line-height: 1.5
    }
</style>
