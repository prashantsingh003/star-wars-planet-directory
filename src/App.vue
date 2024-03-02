<template>
    <div class="platform-content">
      <div class="stars-div">
        <img :src="imageUrls[selectedUrlInd]" alt="">
      </div>
      <!-- Component = layout component (whatever layout value is set in route meta properties) -->
      <component :is="this.$route.meta.layout || 'div'">
        <!-- The below router view is only for the routes without specified layouts -->
        <router-view />
      </component>
    </div>
</template>

<script>
import Layout from './views/Layout.vue';
export default{
  name:'app',
  components:{Layout},
  data(){
    return {
			interVal: null,
			imageUrls: [],
			selectedUrlInd: 0,
    }
  },
	beforeMount() {
		this.interVal = setInterval(() => this.selectedUrlInd = (this.selectedUrlInd + 1) % this.imageUrls.length, 1000);
		const imageUrls = []
		for (let i = 1; i < 8; i++) {
			const url = new URL(`./assets/images/star${i}.png`, import.meta.url).href
			imageUrls.push(url)
		}
		this.imageUrls = imageUrls;
		this.selectedUrlInd = 0
	},
	mounted() { },
	unmounted() {
		clearInterval(this.interVal)
	},
}
</script>

<style scoped lang="scss">
.platform-content{
	background: rgb(20, 20, 20);
	overflow: auto;
	/* push down the the wrapper by half the page */
	position: relative;
	height: 100vh;
	width: 100%;

  .stars-div {
    position: absolute;
    height: 100%;
    width: 100%;

    img {
      object-fit: cover;
      height: 100%;
      width: auto;
      opacity: 0.7;
      animation: fadeIn 1s infinite alternate;
    }
  }
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
}

</style>
