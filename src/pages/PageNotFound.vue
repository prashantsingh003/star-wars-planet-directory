<template>
  <div class="page-wapper white-card px-2 px-sm-3 d-flex flex-column align-center justify-center justify-md-start">
    <!-- <img class="image" src="@/assets/LightMode/pageNotFound.png"/> -->
    <span>
      The page you requested could not be found.
    </span>
    <!-- <router-link to="/dashboard" class="primary-button ma-2">Go To Dashboard</router-link> -->
    <AppBtn><router-link to="/" class="ma-2">Go Home</router-link></AppBtn>
  </div>
</template>
<script>
import AppBtn from '../components/ui/AppBtn.vue';

export default{
    name: 'PageNotFound',
    computed: {},
    components: { AppBtn }
}
</script>
<style scoped>
.image{
  max-width: 50vw;
  min-width: 300px;
}
.page-wapper{
  overflow: hidden;
  margin: auto;
  height: 70vh;
}
</style>