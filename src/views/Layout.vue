<template>
	<v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title class="d-flex justify-center">
        <router-link
          to="/"
        >
          <img src="../assets/star-wars-intro.png" alt="Logo" class="logo">
        </router-link>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
				<router-view v-slot="{ Component }">
					<keep-alive :include="keepAliveComponents">
						<component :is="Component"/>
					</keep-alive>
				</router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
	name:'Layout',
	data(){
		return{}
	}
}
</script>
<style scoped>
.logo{
  height: 2.5rem;
  width: auto;
}
</style>