<template>
	<div>
		<header></header>
		<main class="platform-content">
			<router-view v-slot="{ Component }">
				<keep-alive :include="keepAliveComponents">
					<component :is="Component"/>
				</keep-alive>
			</router-view>
		</main>
	</div>
</template>
<script>
export default {
	name:'Layout',
	data(){
		return{}
	}
}
</script>