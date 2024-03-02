<template>
	<div class="app-card elevation-3">
		<slot></slot>
	</div>
</template>
<script>
export default{
	name:'AppCard'
}
</script>
<style scoped>
.app-card{
	background: transparent;
	border-radius: 10%;
	border: inset;
}
</style>