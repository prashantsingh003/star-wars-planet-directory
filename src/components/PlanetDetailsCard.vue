<template>
	<v-card style="position: relative; overflow: auto;">
		<div class="expand-btn">
			<v-btn @click="closeDialog()" variant="text" icon="mdi-close">
			</v-btn>
		</div>

		<v-card-title class="h2">
			{{ planet.name }}
		</v-card-title>

		<v-card-subtitle>
			Population: {{ population }}+
		</v-card-subtitle>
		<v-card-text class="d-flex justify-space-between align-center">
			<v-list density="compact" class="bg-transparent">
				<v-list-item density="compact">
					Climate: 
				</v-list-item>
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
			</v-list>
			<v-list density="compact" class="bg-transparent">
				<v-list-item density="compact">
					<v-btn color="orange-lighten-2" variant="text">
						Terrain
					</v-btn>
					{{ planet.terrain }}
				</v-list-item>
			</v-list>
		</v-card-text>

		<v-card-actions>
			<v-btn color="orange-lighten-2" variant="text" @click="show=!show">
				View Residents
			</v-btn>

			<v-spacer></v-spacer>

			<v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				<v-container>
					<v-row>
						<v-col v-for="(resident,i) in residentsData" :key="i" cols="6" md="4">
							<Resident :currResident="resident"/>
						</v-col>
					</v-row>
				</v-container>
			</div>
		</v-expand-transition>
	</v-card>
</template>
<script>
import axios from 'axios';
import {getClimateIconData} from '../utils/constants'
import Resident from './Resident.vue';
export default {
	name: 'PlanetDetailsCard',
	props: ['currPlanet'],
	inject: ['closeDialog'],
	components:{Resident},
	beforeMount(){
	},
	mounted() {
		this.fetchResidents()
	},
	data() {
		return {
			planet: this.currPlanet,
			planetData: null,
			show: false,
			residentsData:[]
		}
	},
	watch:{
	},
	methods: {
		async fetchResidents(){
			const {residents}=this.planet;
			residents.forEach(url => {
				axios.get(url)
				.then(response=>{
					this.residentsData.push(response.data)
				})
			});
		},
		print(v){console.log(v)}
	},
	computed:{
		population(){
			let p=parseInt(this.planet.population);
			if(!p){
				return '- - -'
			}
			return p.toLocaleString()
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
	}
}
</script>
<style scoped>
.expand-btn {
	position: absolute;
	right: 0;
	top: 0;
}
</style>