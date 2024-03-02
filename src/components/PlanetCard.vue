<template>
	<div>
		planet card
	</div>
</template>
<script>
import axios from 'axios';
export default {
	name:'PlanetCard',
	props:['planet'],
	emits:[],
	mounted(){
	},
	data(){
		return{
		}
	},
	conputed:{
		planetUrl(){
			return this.planet?.url
		}
	},
	watch:{
		planet(oldVal,newVal){
			if (newVal){
				this.fetchPlanetData()
			}
		}
	},
	methods:{
		fetchPlanetData(){
			axios.get(this.planetUrl)
			.then(({data})=>{
				console.log(data)
			})
		}
	},
}
</script>