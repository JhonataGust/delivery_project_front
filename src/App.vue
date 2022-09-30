<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<style>
  *{
    font-family: 'Roboto', sans-serif !important;
  }
  :root {
    --color-one: white;
  }
.fade__right {
    animation: fade_right 1s ease-in-out;
}

@keyframes fade_right{
 0%{
    transform:translateX(-120px);
 }
}
</style>
<script>
export default {
  name: 'App',
  methods: {
    sessionRedirect(){
      console.log(sessionStorage.getItem('token_user'))
      this.$axios.defaults.headers.common = {'Authorization': `bearer ${String(sessionStorage.getItem('token_user'))}`}
      this.$axios
      .get(`${this.$HOST}/v1/users`)
      .catch((error)=>{
        if(error){
          this.$router.push('/login')
        }else{
          this.$router.push('/home')
        }
      })
      .then((response)=>{
        if(typeof response != 'undefined'){
          this.$router.push('/home')
        }
      })
    }
  },
  mounted(){
    this.sessionRedirect();
  }
}
</script>
