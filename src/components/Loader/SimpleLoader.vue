<template>
    <v-row justify="center">
     <v-progress-circular
      :size="70"
      :width="7"
      color="orange"
      indeterminate
    ></v-progress-circular>
    </v-row>
</template>

<script>
export default {
    name: 'SimpleLoader',
    props: {
        reload: Boolean
    },
    mounted() {
        if(this.reload == true){
        setTimeout(()=>{
            this.$router.go();
        },1000)
    }
    }
}
</script>