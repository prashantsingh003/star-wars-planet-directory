<template>
	<button @click="$emit('appclick')">
		<slot></slot>
	</button>
</template>
<script>
export default{
	name:'AppBtn',
	data(){
		return{}
	},
	emits:['onclick'],
}
</script>
<style scoped>

</style>