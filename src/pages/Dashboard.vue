<template>
	<v-row style="overflow: scroll;">
		<v-col v-for="(planet,index) in planets" :key="planet.name+index" cols="4">
			<v-card height="200">{{planet.name}}</v-card>
		</v-col>
	</v-row>
</template>
<script>
import axios from 'axios';
import { getPlanets } from '../utils/api';
export default {
	name: 'Dashboard',
	data(){
		return{
			pageNumber:1,
			planets:[],
			loading:false,
			itemCounts:0
		}
	},
	mounted(){
		this.fetchPlanets()
	},
	methods:{
		fetchPlanets(){
			axios.get(getPlanets,{
				params:{
					format:'json',
					page:this.pageNumber
				}
			})
			.then(({data})=>{
				const {count,results}=data
				console.log(data)
				this.itemCounts=count;
				this.planets=results;
			})
			.catch(err=>{console.error(err)})
		}
	}
}
</script>