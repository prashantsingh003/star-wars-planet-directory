<template>
	<v-card style="position: relative;">
		<div class="expand-btn">
			<v-btn @click="closeDialog()" variant="text" icon="mdi-close">
			</v-btn>
		</div>
		<v-card class="mx-auto">
			<v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>

			<v-card-title>
				{{ planet.name }}
			</v-card-title>

			<v-card-subtitle>
				1,000 miles of wonder
			</v-card-subtitle>

			<v-card-actions>
				<v-btn color="orange-lighten-2" variant="text">
					Explore
				</v-btn>

				<v-spacer></v-spacer>

				<v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
			</v-card-actions>

			<v-expand-transition>
				<div v-show="show">
					<v-divider></v-divider>

					<v-card-text>
						I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
						sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey,
						you
						add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to
						escape.
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>
	</v-card>
</template>
<script>
import axios from 'axios';
export default {
	name: 'PlanetDetailsCard',
	props: ['planet'],
	inject: ['closeDialog'],
	mounted() {
		console.log(this.planet)
	},
	data() {
		return {
			show: false,
		}
	},
	computed: {
		planetUrl() {
			return this.planet?.url
		}
	},
	watch: {
		planet(oldVal, newVal) {
			this.fetchPlanetData()
		}
	},
	methods: {
		fetchPlanetData() {
			axios.get(this.planetUrl)
				.then(({ data }) => {
					console.log(data)
				})
		}
	},
}
</script>
<style scoped>
.expand-btn {
	position: absolute;
	right: 0;
	top: 0;
}
</style>