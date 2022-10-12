<template>
     <v-progress-circular
      :size="70"
      :width="7"
      color="orange"
      indeterminate
    ></v-progress-circular>
</template>

<script>
export default {
    name: 'SimpleLoader',
    mounted() {
        setTimeout(()=>{
            this.$router.go();
        },1000)
    }
}
</script>