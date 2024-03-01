<template>
    <!-- Component = layout component (whatever layout value is set in route meta properties) -->
    <component :is="this.$route.meta.layout || 'div'" class="platform-content">
      <!-- The below router view is only for the routes without specified layouts -->
      <router-view />
    </component>
  <!-- <LandingPage/> -->
</template>

<script>
import Layout from './views/Layout.vue';
export default{
  name:'app',
  components:{Layout},
}
</script>

<style>
</style>
