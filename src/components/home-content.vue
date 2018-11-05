<template>
    <div>
        <section>
            <v-carousel class="full-page" :hide-delimiters="true">
                <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.photo"
                ></v-carousel-item>
            </v-carousel>
        </section>

        <section v-if="estatesAreFetched">
            <h1 class="recommendation-text">Рекомендовано</h1>
            <div class="cards-container">
                <v-card :hover="true" class="estate-card" v-for="estate in shuffledEstates" :key="estate.id">
                    <router-link :to="'estate/' + estate.id">
                        <v-img
                                :src="homeCard"
                                height="150px"
                                aspect-ratio="2.75"
                        ></v-img>

                        <v-card-title primary-title>
                            <div style="color: black">
                                <h3 class="headline mb-0">Квартира {{ estate.flat }}</h3>
                                <p class="cart-content">
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
        </section>
        <section class="advertisement">
            <div class="a-left" :style="{'background-image': `url(${left})`}">
                <div class="internal">
                    <p class="title-name">Ви власник нерухомості і бажаєте її продати?</p>
                    <p class="body">Наші професіонали нададуть юридичну консультацію, проведуть оцінку майна і
                        допоможуть знайти найкращих покупців за
                        найвигіднішою ціною</p>
                </div>
            </div>
            <div class="a-right" :style="{'background-image': `url(${right})`}">
                <div class="internal">
                    <p class="title-name">Волієте придбати нову нерухомість?</p>
                    <p class="body">У нас ви знайдете найкраще житло за привабливою ціною, житло якість якого
                        підтверджують професіонали</p>
                </div>
            </div>
        </section>
        <section>
            <h1 class="recommendation-text">Наші партнери</h1>
            <carousel :perPageCustom="[[0, 1], [480, 2], [768, 3], [1024, 4], [1920, 6]]" :autoplay="true"
                      :autoplayTimeout="3000"
                      :loop="true"
                      :paginationEnabled="false">
                <slide v-for="logo in partnerLogos" :key="logo.id">
                    <img class="partner-photos"
                         :src="logo"/>
                </slide>
            </carousel>
        </section>
        <section>
            <div>
                <h2 class="recommendation-text">Де ми знаходимось</h2>
            </div>
            <br>
            <gmap-map
                    :center="center"
                    :zoom="12"
                    class="full-page"

            >
                <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center=m.position"
                ></gmap-marker>
            </gmap-map>
        </section>
    </div>
</template>

<script>
    import {carousel1, carousel2, carousel3, carousel4, homeCard, partnerLogos, right, left} from '../assets/images';

    export default {
        name: "home-content",
        data() {
            return {
                right,
                left,
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
                ],
                partnerLogos,

                center: {lat: 48.282121, lng: 25.946537},
                markers: [],
                places: [],
                currentPlace: null
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
            },
            buildSlideMarkup() {
                let slideMarkup = '';
                for (let i = 1; i <= 8; i++) {
                    slideMarkup += '<slide><span class="label">' + '<img :src="partnerLogos[i]">' + '</span></slide>'
                }
                return slideMarkup;
            },

            geolocate() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
                //adding marker with our coordinates to the map
                const marker = {
                    lat: 48.282121,
                    lng: 25.946537
                };
                this.markers.push({position: marker});
            }
        },
        mounted() {
            this.geolocate();
            document.title = "Home Page";
        },
        created() {
            this.fetchTheData();
        }
    }
</script>

<style scoped>
    .full-page {
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
        text-align: center;
        padding: 20px;
    }

    .cart-content {
        margin-top: 5px;
        line-height: 1.5
    }

    .advertisement {
        margin: 20px 0;
        display: flex;
        flex-wrap: wrap;
    }

    .advertisement > div {
        flex: 1 1 250px;
        min-height: 500px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-align: right;
    }

    .internal {
        max-width: 100%;
        height: 100%;
        padding: 100px 20px 0 10px;
        box-sizing: border-box;
    }

    .a-right > div.internal {
        background-color: rgba(113, 172, 65, 0.7);
    }

    .a-left > div.internal {
        background-color: rgba(28, 164, 232, 0.7);
    }

    .internal > p.title-name {
        color: #fff;
        font-size: 36px;
    }

    .internal > p.body {
        color: #fff;
        font-size: 24px;
        padding-bottom: 25px;
    }

    .partners {
        height: 300px;
    }

    .partner-photos {
        width: 80%;
        height: 250px;
        margin: auto;
    }
</style>
