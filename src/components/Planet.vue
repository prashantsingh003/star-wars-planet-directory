<template>
	<v-card class="mx-auto" max-width="368" style="position: relative;">
		<div class="expand-btn">
			<v-btn @click="expand = !expand" variant="text" :icon="expand?'mdi-chevron-double-up':'mdi-chevron-double-down'">
			</v-btn>
		</div>
		<div @click="selectPlanet(planet)">
			<v-card-item :title="planet.name">
				<template v-slot:subtitle>
					<v-icon class="me-1 pb-1" color="green-darken-1" icon="mdi-leaf-circle-outline" size="18"></v-icon>
					{{ planet.terrain }}
				</template>
			</v-card-item>

			<v-card-text class="py-0">
				<v-row align="center" no-gutters>
					<v-col class="text-h4" cols="6">
						{{ population }}
					</v-col>

					<v-col class="text-right" cols="6">
						<v-icon :color="populationColor" icon="mdi-account-group" size="88"></v-icon>
					</v-col>
				</v-row>
			</v-card-text>

			<div class="d-flex">
				<v-list-item density="compact" v-for="(cl,i) in climateProps" :key="cl.color+i">
					<template v-slot:prepend>
						<v-tooltip :text="cl.name">
							<template v-slot:activator="{ props }">
								<v-icon :color="cl.color" :icon="cl.icon"></v-icon>
							</template>
						</v-tooltip>
					</template>
					<v-list-item-subtitle>{{cl.name.toUpperCase()}}</v-list-item-subtitle>
				</v-list-item>
			</div>
		</div>

		<v-expand-transition>
			<div v-if="expand">
				<v-list density="compact" class="bg-transparent">
          <v-list-item
            append-icon="mdi-close"
            :subtitle="planet.diameter"
            title="Diameter"
          />
          <v-list-item
            append-icon="mdi-rotate-360"
            :subtitle="planet.rotation_period+' Hrs'"
            title="Rotation Period"
          />
          <v-list-item
            append-icon="mdi-orbit"
            :subtitle="planet.orbital_period+' Days'"
            title="Oribital Period"
          />
				</v-list>
			</div>
		</v-expand-transition>

		<v-divider></v-divider>
	</v-card>
</template>
<script>
import {getClimateIconData} from '../utils/constants'
export default {
	name: 'Planet',
	props: ['planet'],
	inject: ['selectPlanet'],
	data() {
		return {
			expand: false,
			// name,
			// rotation_period,
			// orbital_period,
			// diameter,
			// climate,
			// gravity,
			// terrain,
			// surface_water,
			// population,
			// residents,
			// url,
		}
	},
	mounted() {
	},
	computed: {
		population() {
			const population = parseInt(this.planet.population)
			if (!population) {
				return '- - -'
			}
			const formatPopulation = Intl.NumberFormat('en-US', {
				notation: "compact",
				maximumFractionDigits: 1
			}).format(population);
			return formatPopulation
		},
		climateProps(){
			const climate=this.planet.climate.split(',');
			const res=[]
			climate.forEach(el => {
				const clObj={...getClimateIconData(el.trim()),name:el}
				res.push(clObj)
			});
			return res;
		},
		populationColor(){
			const population = parseInt(this.planet.population)
			if (!population) {
				return 'blue-lighten-5'
			}
			const mil=1000_000;
			const bil=1000_000_000;
			const tril=1000_000_000_000;
			if (population<100_000) return 'blue-lighten-4';
			else if (population<=mil) return 'blue-lighten-2';
			else if (population<=bil) return 'blue-darken-4';
			else if (population<=tril) return 'blue-darken-1';
			else return 'blue-darken-4'
		}
	}
}
</script>
<style scoped>
.expand-btn{
	position: absolute;
	right: 0;
	top: 0;
}
</style>