<template>
    <div class="card-companies">
        <div class="avatar">
            <img
            src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
            />
        </div>
        <div class="clean_float"></div>
        <div class="infos_clients">
            <h3 class="title">McDonald's</h3>
            <div class="details">
                <p class="open">Aberto <b>(12h ás 22h)</b></p>
                <v-rating
          :model-value="3.5"
          color="amber"
          dense
          half-increments
          readonly
          size="20"
        ></v-rating>
            </div>
        </div>
        <div class="clean_float"></div>
        
    </div>
</template>
<style scoped>
.card-companies{
    color: #ccc;
    border: 1px solid  #ccc;
    border-radius:12px;
    padding: 10px;
    display: flex;
}
.card-companies .infos_clients{
    float: right;
    width: 85%;
    margin-left: 32px;
}
.card-companies .avatar{
    width: 15%;
    float: left;
}
.card-companies .avatar img{
    width: 100%;
    margin-top: 10px;
}
.open{
    color: rgb(67, 179, 141);
}
.close{
    color: rgb(179, 76, 67);
}
</style>
<script>
export default {
    name:'BoxClient'
}
</script>