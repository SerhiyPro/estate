<template>
    <div>
        <v-carousel class="carousel-template" :hide-delimiters="true">
            <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.photo"
            ></v-carousel-item>
        </v-carousel>

        <h1 class="recommendation-text">Рекомендовано</h1>
        <div v-if="estatesAreFetched" class="cards-container">
            <v-card :hover="true" class="estate-card" v-for="estate in shuffledEstates">
                <router-link :to="'estate/' + estate.id">
                    <v-img
                            :src="homeCard"
                            height="150px"
                            aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                        <div style="color: black">
                            <h3 class="headline mb-0">Квартира {{ estate.flat }}</h3>
                            <p style="margin-top: 5px">
                                <span v-if="estate.floor"><b>Поверх:</b> {{ estate.floor }} <br></span>
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
        <div class="advertisement">
            <div class="a-left">
                <div class="internal">
                    <p class="title">Ви власник нерухомості і бажаєте продати її?</p>
                    <p class="body">Наші професіонали нададуть юридичну консультацію, проведуть оцінку майна і
                        допоможуть знайти найкращих покупців за
                        найвигіднішою ціною</p>
                </div>
            </div>
            <div class="a-right">
                <div class="internal">
                    <p class="title">Бажаєте придбати нову нерухомість?</p>
                    <p class="body">У нас ви знайдете найкраще житло за привабливою ціною, житло якість якого
                        підтверджують професіонали</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {carousel1, carousel2, carousel3, carousel4, homeCard} from '../assets/images';

    export default {
        name: "home-content",
        data() {
            return {
                homeCard,
                allEstates: {},
                shuffledEstates: {},
                estatesAreFetched: false,
                items: [
                    {
                        photo: carousel1
                    },
                    {
                        photo: carousel2
                    },
                    {
                        photo: carousel3
                    },
                    {
                        photo: carousel4
                    }
                ]
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
                    this.shuffledEstates = this.estates.picker(3);
                    // console.log(this.estates); // to check whether data was correct
                }).catch(error => {
                    console.log(error);
                    this.$root.callAlert('Проблема з\'єднання з сервером', 'danger');
                }).finally(() => {
                    this.loaded = true;
                });
            }
        },
        created() {
            this.fetchTheData();
        }
    }
</script>

<style scoped>
    .carousel-template {
        height: calc(100vh - var(--header-height));
        min-height: 400px;
    }

    .estate-card {
        width: 300px;
        margin: 5px;
    }

    .cards-container {
        margin: 0 auto;
        display: flex;
        -webkit-box-orient: horizontal;
        max-width: 1024px;
        -webkit-box-direction: normal;
        flex-direction: row;
        -webkit-box-pack: justify;
        justify-content: space-around;
        -webkit-box-align: stretch;
        align-items: stretch;
        flex-wrap: wrap;
    }

    .recommendation-text {
        text-align: left;
        padding: 10px;
    }

    .advertisement {
        margin: 20px 0;
        height: 500px;
        display: flex;
        flex-wrap: wrap;
    }

    .advertisement > div {
        flex: 1 1 250px;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-align: right;
    }

    .advertisement > div.a-right {
        background-image: url(../assets/images/home-content/right.jpg);
    }

    .advertisement > div.a-left {
        background-image: url(../assets/images/home-content/left.jpg);
    }

    .internal {
        max-width: 100%;
        height: 100%;
        padding: 100px 60px 0 60px;
        box-sizing: border-box;
    }

    .a-right > div.internal {
        background-color: rgba(113, 172, 65, 0.7);
    }

    .a-left > div.internal {
        background-color: rgba(28, 164, 232, 0.7);
    }

    .internal > p.title {
        color: #fff;
        font-size: 27px;
        line-height: 34px;
        font-weight: 100;
    }

    .internal > p.body {
        color: #fff;
        font-size: 16px;
        line-height: 28px;
    }

</style>