<template>
    <div>
        <form>
            <input type="text" v-model="authorization.login"/>
            <input type="password" v-model="authorization.pass"/>
            <v-btn @click.prevent="submit">submit</v-btn>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                authorization: {
                    login: '',
                    pass: ''
                },
            }
        },
        methods: {
            submit() {
                localStorage.removeItem('authorized');
                console.log(this.authorization.login + " " + this.authorization.pass);
                let auth = 'Basic ' + new Buffer(this.authorization.login + ':' + this.authorization.pass).toString('base64');
                this.$http.get('http://lab.kids-lu-server.xyz/api/v1/realty', {
                    headers: {
                        'Authorization': auth,
                    } }).then(function (response) {
                    // Success
                    localStorage.setItem('authorized', auth);
                    this.$router.push('/');
                }).catch(error => {
                    console.log(error)
                });
            }
        },
    }
</script>

<style scoped>
    form{
        margin: 100px;
    }

    input {
        border: 1px solid black;
    }
</style>