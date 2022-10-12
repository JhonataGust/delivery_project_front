<template>
    <div class="input_main" v-for="input in inputs" :key="input.type">
        <div  class="fade__right">
        <label>{{input.placeholder}}</label>
        <input :type="input.type" 
        required
        :placeholder="input.placeholder" 
        :value="input.value"
        @change="getValue($event.target.value, input.name)" 
        autocomplete="off"
        :readonly="input.readonly == true ? true : false" 
        />
        </div>
    </div>
</template>
<script>
export default {
    name:'InputSimple',
    props: {
        inputs: Array
    },
    data(){
        return {
            input_values:{},

        }
    },
    methods: {
        getValue(value, input_name){
            this.input_values[input_name] = value;
            this.$emit('emit-payload-input', this.input_values)
        }
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
    input { 
    margin: unset;
    padding-left: 20px;
    outline: none;
    }
}
</style>