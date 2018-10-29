<template>
    <div>
        <div @click="show = !show" class="adv-search" style="cursor: pointer;">
            <div class="top-box">
                <p>Розширений пошук</p>
            </div>
            <img src="http://lessonpix.com/drawings/168/100x100/Gray+Triangle.png"
                 class="triangle">
            <transition name="slide-fade">
                <div @click.stop="" v-if="show" class="internal-block" style="cursor: auto;">
                    <div class="info-block">
                        <v-text-field
                                class="input-margin"
                                v-model="toSearch.name"
                                type="text"
                                label='Назва'
                        ></v-text-field>
                        <div class="inputs-group">
                            <v-text-field
                                    class="input-margin"
                                    v-model="toSearch.housetype"
                                    type="text"
                                    label='Тип будинку'
                            ></v-text-field>
                            <v-text-field
                                    class="input-margin"
                                    v-model="toSearch.layout"
                                    type="text"
                                    label='Планування'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.price"
                                    type="text"
                                    label='Ціна'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.areaall"
                                    type="text"
                                    label='Загальна площа'
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="inputs-group">
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.city"
                                    type="text"
                                    label='Місто'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.street"
                                    type="text"
                                    label='Вулиця'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.house"
                                    type="text"
                                    label='Будинок'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.floor"
                                    type="text"
                                    label='Поверх'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.flat"
                                    type="text"
                                    label='Квартира'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.rooms"
                                    type="text"
                                    label='Кількість кімнат'
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="inputs-group">
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.arearooms"
                                    type="text"
                                    label='Жила площа'
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="toSearch.height"
                                    type="text"
                                    label='Висота стін'
                            ></v-text-field>
                            <v-text-field
                                    class="input-margin"
                                    v-model="toSearch.furniture"
                                    type="text"
                                    label='Меблі'
                            ></v-text-field>
                            <v-text-field
                                    class="input-margin"
                                    v-model="toSearch.flooring"
                                    type="text"
                                    label='Тип підлоги'
                            ></v-text-field>
                            <v-text-field
                                    class="input-margin"
                                    v-model="toSearch.repair"
                                    type="text"
                                    label='Ремонт'
                            ></v-text-field>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'advSearch',
        data() {
            return {
                show: false,
                toSearch: {
                    name: '',
                    housetype: '',
                    price: '',
                    layout: '',
                    city: '',
                    street: '',
                    house: '',
                    floor: '',
                    flat: '',
                    rooms: '',
                    height: '',
                    areaall: '',
                    arearooms: '',
                    furniture: '',
                    flooring: '',
                    repair: ''
                }
            }
        },
        methods: {
            showSearchField() {
                this.show = !this.show;
            }
        },
        mounted() {
        },
        computed: {},
        watch: {
            toSearch: {
                handler(val) {
                    this.$emit('advSearch', this.toSearch);
                },
                deep: true
            }
        },
        created() {
        }


    }
</script>

<style scoped>
    .adv-search {
        color: #999999;
        margin: 10px;
        height: auto;
        position: relative;
        border-top: 3px solid #999999;
    }

    .internal-block {
        margin-top: 30px;
        padding: 0 20px;
        flex-wrap: wrap;
        display: flex;
    }

    .top-box {
        padding: 0 5px;
        left: 50px;
        color: var(--border-title-color);
        position: absolute;
        top: -10px;
        background-color: #fff;
    }

    .triangle {
        -webkit-transform: scaleY(-1);
        transform: scaleY(-1);
        height: 25px;
        position: absolute;
        top: -10px;
        right: 100px;
    }

    .info-block {
        position: relative;
        margin: 20px 20px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--border-title-color);
        flex: 1 1 150px;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    .top-box {
        left: 50px;
        color: var(--border-title-color);
        position: absolute;
        top: -10px;
        background-color: #fff;
    }

    .top-box p {
        font-size: 20px;
        padding: 0 5px;
    }

    .inputs-group {
        flex-wrap: wrap;
        display: flex;
    }

    .inputs-group > select {
        flex: 1 1 250px;
        margin: 0 5px;
        border-bottom: 1px solid rgb(201, 201, 201);
        padding: 5px;
    }

    .input-margin {
        margin-left: 5px;
    }

    .half-width {
        flex: 1 1 175px;
        margin: 0 5px;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>
