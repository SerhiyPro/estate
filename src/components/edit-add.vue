<template>
    <v-layout>
        <top-progress :progress="$root.loader.progress" :bar-color="$root.loader.color" v-if="$root.loader.show"></top-progress>
        <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3 class="top-margin">
            <v-card>
                <v-form v-if="isInit" ref="form" style="padding-top: 12px;" :v-model="isValid" @submit.prevent="submit">
                    <div class="info-block">
                        <div class="top-box">
                            <div>
                                <p>Основна інформація</p>
                            </div>
                        </div>

                        <v-text-field
                                v-model="estate.name"
                                :counter="defaultRealtyUnit.name.counter"
                                :type="defaultRealtyUnit.name.type"
                                :label='defaultRealtyUnit.name.label'
                        ></v-text-field>
                        <v-textarea
                                v-model="estate.description"
                                :counter="defaultRealtyUnit.description.counter"
                                :type="defaultRealtyUnit.description.type"
                                :label="defaultRealtyUnit.description.label"
                                :rules="defaultRealtyUnit.description.rules"
                        ></v-textarea>
                        <div class="inputs-group">
                            <v-select
                                    class="selects"
                                    v-model="estate.housetype"
                                    :items="selects.housetype.items"
                                    label="Тип будинку"
                            ></v-select>
                            <v-select
                                    class="selects"
                                    v-model="estate.roomstype"
                                    :items="selects.typeOfRooms.items"
                                    label="Тип кімнат"
                            ></v-select>
                            <v-select
                                    class="selects"
                                    v-model="estate.layout"
                                    :items="selects.layout.items"
                                    label="Планування"
                            ></v-select>
                            <v-text-field
                                    class="make-inline half-width"
                                    v-model="estate.price"
                                    :label="defaultRealtyUnit.price.label"
                                    :type="defaultRealtyUnit.price.type"
                                    :rules="defaultRealtyUnit.price.rules"
                                    step="100"
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="top-box">
                            <div>
                                <p>Адреса</p>
                            </div>
                        </div>
                        <div class="inputs-group">
                            <v-text-field
                                    class="half-width"
                                    v-model="estate.city"
                                    :counter="defaultRealtyUnit.city.counter"
                                    :type="defaultRealtyUnit.city.type"
                                    :label="defaultRealtyUnit.city.label"
                                    :rules="defaultRealtyUnit.city.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="estate.street"
                                    :counter="defaultRealtyUnit.street.counter"
                                    :type="defaultRealtyUnit.street.type"
                                    :label="defaultRealtyUnit.street.label"
                                    :rules="defaultRealtyUnit.street.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="third-width"
                                    v-model="estate.house"
                                    :counter="defaultRealtyUnit.house.counter"
                                    :type="defaultRealtyUnit.house.type"
                                    :label="defaultRealtyUnit.house.label"
                                    :rules="defaultRealtyUnit.house.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="third-width"
                                    v-model="estate.floor"
                                    :type="defaultRealtyUnit.floor.type"
                                    :label="defaultRealtyUnit.floor.label"
                                    :rules="defaultRealtyUnit.floor.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="third-width"
                                    v-model="estate.flat"
                                    :type="defaultRealtyUnit.flat.type"
                                    :label="defaultRealtyUnit.flat.label"
                                    :rules="defaultRealtyUnit.flat.rules"
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="top-box">
                            <div>
                                <p>Кімнати</p>
                            </div>
                        </div>
                        <div class="inputs-group">
                            <v-text-field
                                    class="half-width"
                                    v-model="estate.rooms"
                                    :type="defaultRealtyUnit.rooms.type"
                                    :label="defaultRealtyUnit.rooms.label"
                                    :rules="defaultRealtyUnit.rooms.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="half-width"
                                    v-model="estate.height"
                                    step="0.1"
                                    :type="defaultRealtyUnit.height.type"
                                    :label="defaultRealtyUnit.height.label"
                                    :rules="defaultRealtyUnit.height.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="third-width"
                                    v-model="estate.areaall"
                                    :type="defaultRealtyUnit.areaall.type"
                                    :label="defaultRealtyUnit.areaall.label"
                                    :rules="defaultRealtyUnit.areaall.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="third-width"
                                    v-model="estate.areakitchen"
                                    :type="defaultRealtyUnit.areakitchen.type"
                                    :label="defaultRealtyUnit.areakitchen.label"
                                    :rules="defaultRealtyUnit.areakitchen.rules"
                            ></v-text-field>
                            <v-text-field
                                    class="third-width"
                                    v-model="estate.arearooms"
                                    :type="defaultRealtyUnit.arearooms.type"
                                    :label="defaultRealtyUnit.arearooms.label"
                                    :rules="defaultRealtyUnit.arearooms.rules"
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="info-block" style="padding-top: 30px; padding-bottom: 30px">
                        <div class="top-box">
                            <div>
                                <p>Додатково</p>
                            </div>
                        </div>
                        <div class="inputs-group">
                            <v-select
                                    class="selects"
                                    v-model="estate.furniture"
                                    :items="selects.furniture.items"
                                    label="Умеблювання"
                            ></v-select>
                            <v-select
                                    class="selects"
                                    v-model="estate.flooring"
                                    :items="selects.flooring.items"
                                    label="Тип підлоги"
                            ></v-select>
                            <v-select
                                    class="selects"
                                    v-model="estate.heating"
                                    :items="selects.heating.items"
                                    label="Вид опалення"
                            ></v-select>
                            <v-select
                                    class="selects"
                                    v-model="estate.repair"
                                    :items="selects.repair.items"
                                    label="Ремонт"
                            ></v-select>
                        </div>
                    </div>
                    <v-btn v-if="this.$route.path.split('/')[2] === 'add'" class="button-margin" type="submit"
                           flat color="orange">Створити
                    </v-btn>
                    <v-btn v-else class="button-margin" type="submit" flat color="orange">Редагувати</v-btn>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import TopProgress from "./top-progress";

    export default {
        name: 'editAndAdd',
        components: {TopProgress},
        data() {
            return {
                pageType: this.$route.path.split('/')[2],
                isValid: true,
                selects: {
                    'housetype': {
                        items: ['Не вказано', 'Цегляний', 'Дерев\'яний', 'Панельний']
                    },
                    'typeOfRooms': {
                        items: ['Не вказано', 'Суміжні', 'Роздільні', 'Суміжно-роздільні']
                    },
                    'layout': {
                        items: ['Не вказано', 'Чешка', 'Київка', 'Старий фонд', 'Хрущовка', 'Сталінка', 'Новобудова',
                            'Особняк', 'Спецпроект', 'Гуртожиток']
                    },
                    'flooring': {
                        items: ['Не вказано', 'Ламінат', 'Дерево', 'Паркет', 'Плитка', 'Лінолеум']
                    },
                    'furniture': {
                        items: ['Без меблів', 'Старі меблі', 'Нові меблі']
                    },
                    'heating': {
                        items: ['Не вказано', 'Без опалення', 'Пічне', 'Централізоване', 'Конвектор', 'АГВ', 'Котельня']
                    },
                    'repair': {
                        items: ['Не вказано', 'Не потиньковано', 'Від забудовника', 'Нежилий стан', 'Добрий стан',
                            'Косметичний ремонт', 'Євроремонт', 'Дизайнерський ремонт', 'Частковий']
                    }
                },
                defaultRealtyUnit: {
                    'name': {
                        'type': 'text',
                        'label': 'Назва',
                        'counter': 15
                    },
                    'description': {
                        rules: [
                            v => v.length <= 200 || 'Опис повинен бути менше 200 символів'
                        ],
                        'type': 'text',
                        'label': 'Опис',
                        'counter': 200
                    },
                    'price': {
                        rules: [
                            v => !!v || 'Ціна необхідна',
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$/.test(v) || 'Неправильна ціна'
                        ],
                        'label': 'Ціна',
                        'type': 'text'
                    },
                    'city': {
                        rules: [
                            v => !!v || 'Вкажіть місто',
                            v => v.length <= 30 || 'Назва міста не повинна перевищувати 30 символів'
                        ],
                        'type': 'text',
                        'label': 'Місто',
                        'counter': 30
                    },
                    'street': {
                        rules: [
                            v => !!v || 'Вкажіть вулицю',
                            v => v.length <= 30 || 'Назва вулиці не повинна бути довшою за 30 символів'
                        ],
                        'type': 'text',
                        'label': 'Вулиця',
                        'counter': 30
                    },
                    'house': {
                        rules: [
                            v => !!v || 'Введіть будинок',
                            v => /[1-9]/.test(v) || 'Номер будинку неправильний',
                            v => v.length <= 30 || 'Назва будинку не повинна перевищувати 30 символів'
                        ],
                        'type': 'text',
                        'label': 'Будинок',
                        'counter': 30
                    },
                    'floor': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Поверх'
                    },
                    'flat': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Квартира'
                    },
                    'rooms': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Кількість кімнат'
                    },
                    'height': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Висота стін'
                    },
                    'areaall': {
                        rules: [
                            v => !!v || 'Введіть площу всіх кімнат',
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Площа всіх кімнат'
                    },
                    'areakitchen': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Площа кухні'
                    },
                    'arearooms': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Введене число неправильне'
                        ],
                        'type': 'text',
                        'label': 'Площа жилих кімнат'
                    },
                },
                name: '',
                estate: {
                    name: '',
                    description: '',
                    housetype: '',
                    roomstype: '',
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
                    areakitchen: '',
                    arearooms: '',
                    furniture: '',
                    flooring: '',
                    heating: '',
                    repair: ''
                },
                emptyEstate: {
                    name: '',
                    description: '',
                    housetype: '',
                    roomstype: '',
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
                    areakitchen: '',
                    arearooms: '',
                    furniture: '',
                    flooring: '',
                    heating: '',
                    repair: ''
                },
                isInit: false
            }
        },
        watch: {
            '$route.path'() {
                this.onStart();
            },
        },
        methods: {
            onStart() {
                this.isInit = false;

                if (this.pageType !== 'add') {
                    this.$root.progress('start');

                    document.title = 'Edit estate';
                    this.isInit = true;

                    this.$http.get(`${this.$root.apiUrl}/realty/` + this.$route.path.split('/')[2], {
                        headers: {
                            'Authorization': localStorage.getItem('authorized'),
                        }
                    }).then(function (response) {
                        console.log(response.body);
                        this.fillEstateObject(response);
                        this.$root.progress('done');
                    }).catch(error => {
                        this.$root.callAlert('Неправильна адреса будівлі', 'danger');
                        this.$router.go(-1);
                        console.log(error);
                        this.$root.progress('');
                    });
                }
                else {
                    document.title = 'Add estate';
                    this.estate = Object.assign({}, this.emptyEstate);
                    setTimeout(() => {
                        this.isInit = true;
                    }, 0)
                }
            },
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.pageType === 'add')
                        this.addEstate();
                    else
                        this.editEstate();
                }
            },
            addEstate() {
                this.$http.post(`${this.$root.apiUrl}/realty`, this.estate, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                })
                    .then(function (response) {
                        // Success
                        console.log(response);
                        this.$root.callAlert('Будівля успішно створена', 'success');
                        this.$router.push('/estates');
                    }).catch(error => {
                    this.$root.callAlert('Сталась помилка', 'danger');
                    console.log(error);
                });
            },
            editEstate() {
                this.$http.put(`${this.$root.apiUrl}/realty/${this.pageType}`, this.estate, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                })
                    .then(function (response) {
                        // Success
                        this.$root.callAlert('Будівля успішно відредагована', 'success');
                        this.$router.push('/estates');
                    }).catch(error => {
                    this.$root.callAlert('Сталась помилка', 'danger');
                    console.log(error);
                });
            },
            fillEstateObject(response) {

                if (response.body.description === null) {
                    response.body.description = '';
                }

                for (let key in response.body) {
                    if (response.body.hasOwnProperty(key)) {
                        this.estate[key] = response.body[key];
                    }
                }
            }
        },
        mounted() {
        },
        computed: {},
        created() {
            this.onStart();
        }


    }
</script>

<style scoped>

    @media screen and (min-width: 600px) {
        .top-margin {
            margin-top: 20px;
        }
    }

    .inputs-group {
        flex-wrap: wrap;
        display: flex;
    }

    .selects {
        flex: 1 1 300px;
        margin: 0 5px;
    }

    .half-width {
        flex: 1 1 300px;
        min-width: 35%;
        margin: 0 5px;
    }

    .top-box {
        position: absolute;
        left: 0;
        height: 32px;
        top: -16px;
        width: 100%;
    }

    .top-box div {
        color: var(--border-title-color);
        background-color: #fff;
        width: fit-content;
        margin-left: 50px;
    }

    @media screen and (max-width: 480px) {
        .top-box div {
            margin: 0 auto;
        }
    }

    .top-box p {
        font-size: 20px;
        padding: 0 5px;
    }

    .info-block {
        position: relative;
        margin: 20px 20px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--border-title-color);
    }

    .third-width {
        margin: 0 5px;
        flex: 1 1 150px;
    }

    .button-margin {
        margin-left: 20px;
    }

</style>
