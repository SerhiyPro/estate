<template>
    <div>
        <v-layout style="margin-top: 20px">
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-img
                            class="white--text"
                            height="350px"
                            :src="estates[`0x${estate.id}`%10]"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">Квартира {{  estate.flat  }}</span>
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

    export default {
        name: 'estate',
        data() {
            return {
                estates,
                estate: {},
                date: null,
                dialog: false
            }
        },
        methods: {
            checkValidId() {
                if (isFinite('0x' + this.$route.params.id))
                    console.log('is hex');
                else {
                    this.$root.callAlert ('Некоректна адреса');
                    this.$router.go(-1);
                }
            },
            fetchDataAboutGivenEstate() {
                this.$http.get(`${this.$root.apiUrl}/realty/` + this.$route.params.id, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                }).then(function (response) {
                    // Success
                    this.estate = response.body;
                    this.date = response.body.createdAt.slice(0, response.body.createdAt.indexOf(' '));
                    // console.log(this.estates);
                }).catch(error => {
                    console.log(error);
                    this.$root.callAlert ('Неіснуюча будівля', 'danger');
                    this.$router.push('/');
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
                    this.$root.callAlert ('Успішно видалено', 'success');
                    this.$router.push('/estates');
                    // console.log(this.estates);
                }).catch(error => {
                    this.$root.callAlert ('Будівля не була видалена, сталась помилка', 'danger');
                    console.log(error)
                });
            }
        },
        mounted() {
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
</style>
