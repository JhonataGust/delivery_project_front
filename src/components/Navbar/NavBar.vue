<template>
        <div class="bottom_navbar">
            <div class="nav-bar">
                <div class="links">
                    <router-link to="/profile">
                        <v-icon aria-hidden="false">
                            mdi-account
                        </v-icon>
                    </router-link>
                    <router-link to="/home">
                    <v-icon aria-hidden="false">
                        mdi-food-steak
                    </v-icon>
                </router-link>
                <router-link to="/ok">
                    <v-icon aria-hidden="false">
                        mdi-star
                    </v-icon>
                </router-link>
                <router-link  to="/ok">
                    <v-icon aria-hidden="false">
                        mdi-map-marker-star-outline
                    </v-icon>
                </router-link>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style scoped>
    .bottom_navbar{
        position: fixed;
        left: 0;
        right: 0;
        text-align: center;
        bottom: 0px;
        width: 100%;
        background: rgb(253, 253, 253);
        box-shadow:
        0.7px 0.4px 2.2px rgba(0, 0, 0, 0.02),
        1.7px 1px 5.3px rgba(0, 0, 0, 0.028),
        3.3px 1.9px 10px rgba(0, 0, 0, 0.035),
        5.8px 3.4px 17.9px rgba(0, 0, 0, 0.042),
        10.9px 6.3px 33.4px rgba(0, 0, 0, 0.05),
        26px 15px 80px rgba(0, 0, 0, 0.07);
        padding: 15px;
    }

    a.router-link-exact-active { 
    color: #412710;
    background: #fff;
    z-index: 2; 
    animation: show_up 0.3s ease-in-out;
    box-shadow:
        0.7px 0.4px 2.2px rgba(0, 0, 0, 0.02),
        1.7px 1px 5.3px rgba(0, 0, 0, 0.028),
        3.3px 1.9px 10px rgba(0, 0, 0, 0.035),
        5.8px 3.4px 17.9px rgba(0, 0, 0, 0.042),
        10.9px 6.3px 33.4px rgba(0, 0, 0, 0.05),
        26px 15px 80px rgba(0, 0, 0, 0.07);
        padding: 20px 0px; 
        border-radius:100%; 
    }

    a{
        text-decoration: none;
        color: #ff7900;
    }

    i {
        margin: 0px 20px;
    }

    @keyframes show_up{
        0%{
            padding: 0px;
        }
        100%{
            box-shadow:
        0.7px 0.4px 2.2px rgba(0, 0, 0, 0.02),
        1.7px 1px 5.3px rgba(0, 0, 0, 0.028),
        3.3px 1.9px 10px rgba(0, 0, 0, 0.035),
        5.8px 3.4px 17.9px rgba(0, 0, 0, 0.042),
        10.9px 6.3px 33.4px rgba(0, 0, 0, 0.05),
        26px 15px 80px rgba(0, 0, 0, 0.07);
        padding: 20px 0px; 
        border-radius:100%; 
        }
    }
</style>