<template>
	<v-dialog
		transition="dialog-bottom-transition"
		max-width="800px"
		v-model="showDialog"
	>
		<template v-slot:default="{ isActive }">
			<PlanetDetailsCard :currPlanet="selectedPlanet"/>
		</template>
	</v-dialog>
	<v-container>
		<v-row>
			<v-col v-for="i in loading?isSm?2:10:0">
				<v-skeleton-loader
					:loading="loading"
					height="240"
					width="240"
					type="image, list-item-two-line"
				>
					<Planet :planet="planet"/>
				</v-skeleton-loader>
			</v-col>
			<v-col v-for="(planet,index) in loading?[]:planets" :key="planet.name+index" cols="12" sm="6" md="4">
					<Planet :planet="planet"/>
			</v-col>
		</v-row>
		
		<v-row justify="center">
			<v-col cols="8">
				<v-container class="max-width">
					<v-pagination
						v-model="pageNumber"
						:length="10"
						class="my-4"
					></v-pagination>
				</v-container>
			</v-col>
		</v-row>
	</v-container>

</template>
<script>
import axios from 'axios';
import { getPlanets } from '../utils/api';
import PlanetDetailsCard from '../components/PlanetDetailsCard.vue';
import Planet from '../components/Planet.vue';
import { computed } from 'vue';
export default {
	name: 'Dashboard',
	components:{PlanetDetailsCard,Planet},
	data(){
		return{
			pageNumber:1,
			planets:[],
			loading:false,
			itemCounts:0,

			showDialog:false,
			selectedPlanet:null,
		}
	},
	mounted(){
		this.fetchPlanets()
	},
	computed:{
    isSm(){
      return this.$vuetify.display.width<900;
    },
	},
	watch:{
		pageNumber(){
			this.fetchPlanets()
		}
	},
	methods:{
		async fetchPlanets(){
			this.loading=true;
			await axios.get(getPlanets,{
				params:{
					format:'json',
					page:this.pageNumber
				}
			})
			.then(({data})=>{
				const {count,results}=data
				this.itemCounts=count;
				this.planets=results;
			})
			.catch(err=>{console.error(err)})
			this.loading=false
		},
		handlePlanetClick(planet){
			this.selectedPlanet=planet
			this.showDialog=true
		}
	},
  provide() {
    return {
      isDialogOpen : computed(() => this.showDialog),
			selectPlanet : this.handlePlanetClick,
      closeDialog: ()=>{
				this.showDialog=false;
			},
    }
  },
}
</script>