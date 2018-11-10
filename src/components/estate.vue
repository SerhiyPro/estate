<template>
    <div class="main">
        <top-progress :progress="$root.loader.progress" :bar-color="$root.loader.color" v-if="$root.loader.show"></top-progress>
        <v-layout>
            <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
                <v-card>
                    <v-img
                            class="white--text"
                            height="350px"
                            :src="estates[`0x${estate.id}`%10]"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <v-icon style="margin: 20px" large color="white darken-2" @click="goBack">
                                        reply_all
                                    </v-icon>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-title>
                        <div style="padding-left: 5px; font-size: 15px">
                            <span v-if="estate.floor"><b>Поверх:</b> {{ estate.floor }}<br></span>
                            <span><b>Тип будинку:</b> {{ estate.housetype }}<br>
                            <b>Площа квартири:</b> {{ estate.arearooms }} м<sup>2</sup><br>
                            <b>Умеблювання:</b> {{ estate.furniture }}<br>
                            <b>Кількість кімнат:</b> {{ estate.rooms }}<br>
                            <b>Тип кімнат:</b> {{ estate.roomstype }}<br>
                            <b>Обігрів:</b> {{ estate.heating }}<br>
                            <b>Розташування:</b> вул. {{ estate.street }}, {{ estate.city }} <br></span>
                            <span><b>Ціна: </b>{{  estate.price  }} грн<br/></span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn :to="$route.fullPath + '/edit'" flat color="orange">Редагувати</v-btn>
                        <v-dialog v-model="dialog" width="500">
                            <v-btn flat color="red" slot="activator">Видалити</v-btn>
                            <v-card>
                                <v-card-title
                                        class="headline grey lighten-2"
                                        primary-title>Продовжити?
                                </v-card-title>

                                <v-card-text>
                                    Видалену будівлю неможливо буде відновити..
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="green"
                                            flat @click="dialog = false">Ні
                                    </v-btn>
                                    <v-btn
                                            color="red lighten-2"
                                            flat @click="deleteEstate">Так
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <div class="grey--text price"><i>{{ date }}</i></div>
                        <br>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {estates} from "../assets/images";
    import TopProgress from "./top-progress";

    export default {
        name: 'estate',
        components: {TopProgress},
        data() {
            return {
                paramsId: this.$route.params.id,
                estates,
                estate: {},
                date: null,
                dialog: false,
            }
        },
        methods: {
            checkValidId() {
                if (isFinite('0x' + this.paramsId))
                    console.log('is hex');
                else {
                    this.$root.callAlert('Некоректна адреса');
                    this.$router.go(-1);
                }
            },
            fetchDataAboutGivenEstate() {
                this.$root.progress('start');

                this.$http.get(`${this.$root.apiUrl}/realty/${this.paramsId}`, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                }).then(function (response) {
                    // Success
                    this.estate = response.body;
                    this.date = response.body.createdAt.slice(0, response.body.createdAt.indexOf(' '));
                    this.$root.progress('done');
                }).catch(error => {
                    console.log(error);
                    this.$root.callAlert('Неіснуюча будівля', 'danger');
                    this.$router.push('/');
                    this.$root.progress('');
                });
            },
            deleteEstate() {
                this.dialog = false;
                this.$http.delete(`${this.$root.apiUrl}/realty/` + this.$route.fullPath.split('/')[2], {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                }).then(function (response) {
                    // Success
                    this.$root.callAlert('Успішно видалено', 'success');
                    this.$router.push('/estates');
                }).catch(error => {
                    this.$root.callAlert('Будівля не була видалена, сталась помилка', 'danger');
                    console.log(error)
                });
            },
            goBack() {
                this.$router.go(-1);
            }
        },
        mounted() {
            document.title = 'Estate';
        },
        computed: {},
        watch: {},
        created() {
            this.checkValidId();
            this.fetchDataAboutGivenEstate();
        },
    }
</script>

<style scoped>
    .price {
        width: 100%;
        padding-right: 10px;
        text-align: right;
    }

    @media screen and (min-width: 600px) {
        .main {
            margin-top: 20px;
        }
    }

    @media screen and (max-width: 480px) {
        .v-btn {
            padding: 0 8px;
        }
    }
</style>
