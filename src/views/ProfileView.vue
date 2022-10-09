<template>
    <input-simple :inputs="info_inputs"></input-simple>
</template>
<script>
import InputSimple from '@/components/Form/Inputs/InputSimple.vue'
export default {
  components: { InputSimple },
    name:'ProfileView',
    data(){
        return {
            info_inputs: [
                {   id:1,
                    type: 'text',
                    placeholder: 'Nome',
                    value:''
                },
                {   id:2,
                    type: 'email',
                    placeholder:'E-mail',
                    value:''
                },
                {
                    id:3,
                    type: 'password',
                    placeholder: 'Senha',
                    value:''
                }
            ]
        }
    }
}
</script>