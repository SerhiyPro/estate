<template>
    <div class="centered-main image" :style="{'background-image': `url(${estates[3]})`}">
        <v-layout>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
                <v-card class="centered-card" style="min-width: 320px">
                    <v-container fill-height fluid style="padding: 10px 0;">
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline">Агенство нерухомісті</span>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-card-title>
                            <v-form class="inputs" ref="form" :v-model="isValid" @submit.prevent="submit">
                            <v-text-field
                                    v-model="authorization.login"
                                    type="text"
                                    label="Логін"
                                    :rules="rules.login"
                            ></v-text-field>
                            <v-text-field
                                    v-model="authorization.pass"
                                    type="password"
                                    label="Пароль"
                                    :rules="rules.pass"
                            ></v-text-field>
                            </v-form>

                    </v-card-title>
                    <v-card-actions class="login-buttons">
                        <v-btn flat color="orange" type="submit" @click.prevent="submit">Увійти</v-btn>
                        <v-btn flat color="orange"  v-disable="{disable:true,value:'Найближчим часом'}">Зареєструватись</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {estates} from "../assets/images";

    export default {
        name: "Login",
        data() {
            return {
                estates,
                isValid: true,
                authorization: {
                    login: '',
                    pass: ''
                },
                rules: {
                    login: [
                        v => !!v || 'Логін необхідний',
                        v => v.length <= 100 || 'Логін не повинен бути довшим за 100 символів'
                    ],
                    pass: [
                        v => !!v || 'Пароль необхідний',
                        v => v.length <= 100 || 'Пароль не повинен бути довшим за 100 символів'
                    ]
                }
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    localStorage.removeItem('authorized');
                    let auth = 'Basic ' + new Buffer(this.authorization.login + ':' + this.authorization.pass).toString('base64');
                    this.$http.get(`${this.$root.apiUrl}/realty`, {
                        headers: {
                            'Authorization': auth,
                        }
                    }).then(function (response) {
                        // Success
                        localStorage.setItem('authorized', auth);
                        this.$router.push('/');
                    }).catch(error => {
                        this.$root.callAlert('Неправильний логін чи пароль', 'danger');
                    });
                }
                else {
                    this.$root.callAlert('Введіть і логін, і пароль', 'danger');
                }
            }
        },
        mounted() {
            document.title = "Login";
        }
    }
</script>

<style scoped>
    form {
        margin: 100px;
    }

    input {
        border: 1px solid black;
    }

    .centered-main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        height: 100%;
    }

    .image {
        /*background-image: url("../assets/images/estates/estate-3.jpg");*/
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .centered-card {
        flex: 1;
        background-color: rgba(255,255,255,0.9);
        text-align: center;
    }

    .inputs{
        margin: 0;
        width: 100%;
    }

    .login-buttons {
        display: flex;
        /*justify-content: flex-end;*/
    }
</style>
