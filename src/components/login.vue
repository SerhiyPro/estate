<template>
    <div class="centered-main image">
        <v-layout>
            <v-flex xs12 sm4 offset-sm4>
                <v-card class="centered-card">
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline">Top Estates for sale</span>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-card-title>

                            <v-form class="inputs" ref="form" :v-model="isValid" @submit.prevent="submit">
                            <v-text-field
                                    v-model="authorization.login"
                                    type="text"
                                    label="Login"
                                    :rules="rules.login"
                            ></v-text-field>
                            <v-text-field
                                    v-model="authorization.pass"
                                    type="password"
                                    label="Password"
                                    :rules="rules.pass"
                            ></v-text-field>
                            </v-form>

                    </v-card-title>
                    <v-card-actions class="login-buttons">
                        <v-btn flat color="orange" type="submit" @click.prevent="submit">Login</v-btn>
                        <v-btn flat color="orange"  v-disable="{disable:true,value:'comming soon'}"><i>Register</i></v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                isValid: true,
                authorization: {
                    login: '',
                    pass: ''
                },
                rules: {
                    login: [
                        v => !!v || 'Login is required',
                        v => v.length <= 100 || 'Name must be less than 100 characters'
                    ],
                    pass: [
                        v => !!v || 'Password is required',
                        v => v.length <= 100 || 'Name must be less than 100 characters'
                    ]
                }
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    localStorage.removeItem('authorized');
                    console.log(this.authorization.login + " " + this.authorization.pass);
                    let auth = 'Basic ' + new Buffer(this.authorization.login + ':' + this.authorization.pass).toString('base64');
                    this.$http.get('http://lab.kids-lu-server.xyz/api/v1/realty', {
                        headers: {
                            'Authorization': auth,
                        }
                    }).then(function (response) {
                        // Success
                        localStorage.setItem('authorized', auth);
                        this.$router.push('/');
                    }).catch(error => {
                        console.log(error);
                        this.$parent.callAlert('Incorrect login or password', 'danger');
                    });
                }
                else {
                    this.$parent.callAlert('Enter both login and password', 'danger');
                }
            }
        },
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
        background-image: url(http://estatesat32nd.com/images/parallax/home_res9.jpg);
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
        justify-content: flex-end;
    }
</style>