<template>
    <v-layout style="margin-top: 10px">
        <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
            <v-card>
                <v-form ref="form" :v-model="isValid" @submit.prevent="submit">
                    <div class="info-block">
                        <div class="top-box">
                            <p>Основна інформація</p>
                        </div>
                        <v-text-field
                                v-model="estate.name"
                                :counter="defaultRealtyUnit.name.counter"
                                :type="defaultRealtyUnit.name.type"
                                :label='defaultRealtyUnit.name.label'
                                :rules="defaultRealtyUnit.name.rules"
                        ></v-text-field>
                        <v-textarea
                                v-model="estate.description"
                                :counter="defaultRealtyUnit.description.counter"
                                :type="defaultRealtyUnit.description.type"
                                :label="defaultRealtyUnit.description.label"
                                :rules="defaultRealtyUnit.description.rules"
                        ></v-textarea>
                        <div class="inputs-group">
                            <select v-model="checks.checkedTypeOfTheHouse">
                                <option :selected="true">Тип будинку</option>
                                <option v-for="item in selects.housetype.items">{{item}}</option>
                            </select>
                            <select v-model="checks.checkedTypeOfRooms">
                                <option :selected="true">Тип кімнат</option>
                                <option v-for="item in selects.typeOfRooms.items">{{item}}</option>
                            </select>
                            <v-text-field
                                    class="make-inline half-width"
                                    v-model="estate.price"
                                    :label="defaultRealtyUnit.price.label"
                                    :type="defaultRealtyUnit.price.type"
                                    :rules="defaultRealtyUnit.price.rules"
                                    step="100"
                            ></v-text-field>
                            <select style="margin-bottom: 19px;" v-model="checks.checkedLayout">
                                <option :selected="true">Планування</option>
                                <option v-for="item in selects.layout.items">{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="top-box">
                            <p>Адреса</p>
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
                            <p>Кімнати</p>
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
                            <p>Додатково</p>
                        </div>
                        <div class="inputs-group">
                            <select v-model="checks.checkedFurniture">
                                <option :selected="true">Меблі</option>
                                <option v-for="item in selects.furniture.items">{{item}}</option>
                            </select>
                            <select v-model="checks.checkedFlooring">
                                <option :selected="true">Тип підлоги</option>
                                <option v-for="item in selects.flooring.items">{{item}}</option>
                            </select>
                            <select style="margin-top: 30px" v-model="checks.checkedHeating">
                                <option :selected="true">Вид опалення</option>
                                <option v-for="item in selects.heating.items">{{item}}</option>
                            </select>
                            <select v-model="checks.checkedRepair">
                                <option :selected="true">Ремонт</option>
                                <option v-for="item in selects.repair.items">{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <v-btn v-if="this.$route.path.split('/')[2] === 'add'" class="button-margin" type="submit"
                           color="success">Створити
                    </v-btn>
                    <v-btn v-else class="button-margin" type="submit" color="success">Редагувати</v-btn>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name: 'editAndAdd',
        data() {
            return {
                isValid: true,
                checks: {
                    checkedTypeOfTheHouse: 'Тип будинку',
                    checkedTypeOfRooms: 'Тип кімнат',
                    checkedLayout: 'Планування',
                    checkedFlooring: 'Тип підлоги',
                    checkedFurniture: 'Меблі',
                    checkedHeating: 'Вид опалення',
                    checkedRepair: 'Ремонт'
                },
                selects: {
                    'housetype': {
                        items: ['Цегляний', 'Дерев\'яний', 'Панельний']
                    },
                    'typeOfRooms': {
                        items: ['Суміжні', 'Роздільні', 'Суміжно-роздільні']
                    },
                    'layout': {
                        items: ['Чешка', 'Київка', 'Старий фонд', 'Хрущовка', 'Сталінка', 'Новобудова',
                            'Особняк', 'Спецпроект', 'Гуртожиток']
                    },
                    'flooring': {
                        items: ['Ламінат', 'Дерево', 'Паркет', 'Плитка', 'Лінолеум']
                    },
                    'furniture': {
                        items: ['Старі меблі', 'Нові меблі']
                    },
                    'heating': {
                        items: ['Без опалення', 'Пічне', 'Централізоване', 'Конвектор', 'АГВ', 'Котельня']
                    },
                    'repair': {
                        items: ['Не потиньковано', 'Від забудовника', 'Нежилий стан', 'Добрий стан',
                            'Косметичний ремонт', 'Євроремонт', 'Дизайнерський ремонт', 'Частковий']
                    }
                },
                defaultRealtyUnit: {
                    'name': {
                        rules: [
                            v => !!v || 'Name is required',
                            v => v.length <= 15 || 'Name must be less than 15 characters',
                        ],
                        'type': 'text',
                        'label': 'Назва',
                        'counter': 15
                    },
                    'description': {
                        rules: [
                            v => v.length <= 200 || 'Description must be less than 200 characters'
                        ],
                        'type': 'text',
                        'label': 'Опис',
                        'counter': 200
                    },
                    'price': {
                        rules: [
                            v => !!v || 'Price is required',
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$/.test(v) || 'Invalid price'
                        ],
                        'label': 'Ціна',
                        'type': 'text'
                    },
                    'city': {
                        rules: [
                            v => !!v || 'Entering city is required',
                            v => v.length <= 15 || 'City must be less than 15 symbols'
                        ],
                        'type': 'text',
                        'label': 'Місто',
                        'counter': 15
                    },
                    'street': {
                        rules: [
                            v => !!v || 'Enter the street',
                            v => v.length <= 30 || 'Street must be less than 30 symbols'
                        ],
                        'type': 'text',
                        'label': 'Вулиця',
                        'counter': 30
                    },
                    'house': {
                        rules: [
                            v => !!v || 'Enter the house',
                            v => v.length <= 30 || 'House must be less than 30 symbols'
                        ],
                        'type': 'text',
                        'label': 'Будинок',
                        'counter': 30
                    },
                    'floor': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Entered number is invalid'
                        ],
                        'type': 'text',
                        'label': 'Поверх'
                    },
                    'flat': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Entered number is invalid'
                        ],
                        'type': 'text',
                        'label': 'Квартира'
                    },
                    'rooms': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Entered number is invalid'
                        ],
                        'type': 'text',
                        'label': 'Кількість кімнат'
                    },
                    'height': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Entered number is invalid'
                        ],
                        'type': 'text',
                        'label': 'Висота стін'
                    },
                    'areaall': {
                        rules: [
                            v => !!v || 'Enter the area of all rooms',
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$/.test(v) || 'Entered number is invalid'
                        ],
                        'type': 'text',
                        'label': 'Площа всіх кімнат'
                    },
                    'areakitchen': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Entered number is invalid'
                        ],
                        'type': 'text',
                        'label': 'Площа кухні'
                    },
                    'arearooms': {
                        rules: [
                            v => /^(0|0[.|,]\d+|[1-9]\d*([.|,]\d+)?)$|^$/.test(v) || 'Entered number is invalid'
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
                }

            }
        },
        methods: {
            onStart() {
                console.log(this.$route.path.split('/')[2]);
                if (this.$route.path.split('/')[2] !== 'add') {
                    console.log('editing ' + this.$route.path.split('/')[2]);
                    this.$http.get('http://lab.kids-lu-server.xyz/api/v1/realty/' + this.$route.path.split('/')[2], {
                        headers: {
                            'Authorization': localStorage.getItem('authorized'),
                        }
                    }).then(function (response) {
                        console.log(response.body);
                        this.fillEstateObject(response);
                        this.fillChecks(response);
                    }).catch(error => {
                        this.$parent.$parent.callAlert('Incorrect id of festate', 'danger');
                        this.$router.go(-1);
                        console.log(error);
                    });
                }
            },
            submit() {
                // todo change the way we get info from selects
                if (this.$refs.form.validate()) {
                    this.checkSelects();
                    if (this.$route.path.split('/')[2] === 'add')
                        this.addEstate();
                    else
                        this.editEstate();
                }
                else {
                    // todo alerting user that he entered invalid values
                }
            },
            addEstate() {
                this.$http.post('http://lab.kids-lu-server.xyz/api/v1/realty', this.estate, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                })
                    .then(function (response) {
                        // Success
                        console.log(response);
                        this.$parent.$parent.callAlert('Estate was successfully created', 'success');
                        this.$router.push('/estates');
                    }).catch(error => {
                    this.$parent.$parent.callAlert('There was some troubles with creating new estate', 'danger');
                    console.log(error);
                });
            },
            editEstate() {
                this.$http.put('http://lab.kids-lu-server.xyz/api/v1/realty/' + this.$route.path.split('/')[2], this.estate, {
                    headers: {
                        'Authorization': localStorage.getItem('authorized'),
                    }
                })
                    .then(function (response) {
                        // Success
                        console.log(response);
                        this.$router.push('/estates');
                    }).catch(error => {
                    this.$parent.$parent.callAlert('There was some troubles with editing estate', 'danger');
                    console.log(error);
                });
            },
            checkSelects() {
                let phrase = 'Не вказано';
                if (this.selects.housetype.items.indexOf(this.checks.checkedTypeOfTheHouse) === -1)
                    this.estate.housetype = phrase;
                else
                    this.estate.housetype = this.checks.checkedTypeOfTheHouse;

                if (this.selects.typeOfRooms.items.indexOf(this.checks.checkedTypeOfRooms) === -1)
                    this.estate.roomstype = phrase;
                else
                    this.estate.roomstype = this.checks.checkedTypeOfRooms;

                if (this.selects.layout.items.indexOf(this.checks.checkedLayout) === -1)
                    this.estate.layout = phrase;
                else
                    this.estate.layout = this.checks.checkedLayout;

                if (this.selects.furniture.items.indexOf(this.checks.checkedFurniture) === -1)
                    this.estate.furniture = 'Без меблів';
                else
                    this.estate.furniture = this.checks.checkedFurniture;

                if (this.selects.flooring.items.indexOf(this.checks.checkedFlooring) === -1)
                    this.estate.flooring = phrase;
                else
                    this.estate.flooring = this.checks.checkedFlooring;

                if (this.selects.heating.items.indexOf(this.checks.checkedHeating) === -1)
                    this.estate.heating = phrase;
                else
                    this.estate.heating = this.checks.checkedHeating;

                if (this.selects.repair.items.indexOf(this.checks.checkedRepair) === -1)
                    this.estate.repair = phrase;
                else
                    this.estate.repair = this.checks.checkedRepair;
            },
            fillChecks(response) {
                if (response.body.layout.length === 0)
                    this.checks.checkedLayout = response.body.layout;
                if (response.body.housetype.length === 0)
                    this.checks.checkedTypeOfTheHouse = response.body.housetype;
                if (response.body.roomstype.length === 0)
                    this.checks.checkedTypeOfRooms = response.body.roomstype;
                if (response.body.furniture.length === 0)
                    this.checks.checkedFurniture = response.body.furniture;
                if (response.body.flooring.length === 0)
                    this.checks.checkedFlooring = response.body.flooring;
                if (response.body.heating.length === 0)
                    this.checks.checkedHeating = response.body.heating;
                if (response.body.repair.length === 0)
                    this.checks.checkedRepair = response.body.repair;
            },
            fillEstateObject(response) {
                this.estate.name = response.body.name;

                if (response.body.description === null)
                    this.estate.description = '';
                else
                    this.estate.description = response.body.description;

                this.estate.price = response.body.price;
                this.estate.city = response.body.city;
                this.estate.street = response.body.street;
                this.estate.house = response.body.house;
                this.estate.floor = response.body.floor;
                this.estate.flat = response.body.flat;
                this.estate.rooms = response.body.rooms;
                this.estate.height = response.body.height;
                this.estate.areaall = response.body.areaall;
                this.estate.areakitchen = response.body.areakitchen;
                this.estate.arearooms = response.body.arearooms;
            }
        },
        mounted() {
        },
        computed: {},
        watch: {},
        created() {
            this.onStart();
        }


    }
</script>

<style scoped>
    .inputs-group {
        flex-wrap: wrap;
        display: flex;
    }

    .inputs-group > select {
        flex: 1 1 250px;
        margin: 0 5px;
    }

    .half-width {
        flex: 1 1 250px;
        margin: 0 5px;
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

    .info-block {
        position: relative;
        margin: 20px 20px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--border-title-color);
    }

    .third-width{
        margin: 0 5px;
        flex: 1 1 150px;
    }


    .button-margin {
        margin-left: 20px;
    }

    select {
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.87);
        padding: 8px 8px 8px 0;
        color: rgba(0, 0, 0, 0.6);
    }

    option {
        border: none;
    }
</style>
