<template>
    <div class="input_main" v-for="input in inputs" :key="input.id">
        <input :type="input.type" :placeholder="input.placeholder"/>
    </div>
</template>
<script>
export default {
    name:'InputSimple',
    props: {
        inputs: Array
    }
}
</script>
<style scoped>
.input_main{
    margin: 20px;
}

input{
    margin: 12px 0px;
    width: 100%;
    padding: 8px 5px;
    padding-left: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    display: inline-block;
    outline: none;
}   

input:focus{
    box-shadow:
  0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
  0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
  0px 0.6px 10px rgba(0, 0, 0, 0.035),
  0px 1.1px 17.9px rgba(0, 0, 0, 0.042),
  0px 2.1px 33.4px rgba(0, 0, 0, 0.05),
  0px 5px 80px rgba(0, 0, 0, 0.07)
;
}
@media only screen and (max-width:800px) {
    .header__div{
        margin-top: 0px;
        width: 100%;
        padding:15px !important;
    }¨
    .form input {
    margin: unset;
    padding:unset;
    padding-left: 20px;
    outline: none;
    }
}
</style>