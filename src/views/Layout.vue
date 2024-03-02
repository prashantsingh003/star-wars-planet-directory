<template>
	<v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
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
