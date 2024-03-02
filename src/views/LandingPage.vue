<template>
	<div class="parent" ref="parent" @click="startTheShow">
		<div style="position: absolute;z-index: 5;" class="m-4">
			<AppBtn @appclick="startTheShow()">Start your journey</AppBtn>
		</div>
		<div class="dark-div" ref="darkDiv">
			<audio ref="audioPlayer" :muted="!isMuted">
				<source src="../assets/star-wars-intro.mp3" type="audio/mpeg">
			</audio>
			<div v-if="started" style="position: fixed; top: 0; right: 0; padding: 1em; border: 1px white;border-radius: 50%;">
				<button @click="isMuted = !isMuted">
					{{ isMuted ? 'Unmute' : 'Mute' }}
				</button>
			</div>
			<img src="../assets/star-wars-intro.png" alt="" :class="started ? 'started' : 'initial'">
		</div>
		<div class="wrapper">
			<div class="scroll-text" :class="started ? 'started' : 'initial'">
				<h1>STAR WARS</h1>
				<h2>{{ content.title }}</h2>
				<p v-for="(para, index) in content.paragraphs" :key="index + 'para'">
					{{ para }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import AppBtn from '../components/ui/AppBtn.vue'

export default {
	name: 'LandingPage',
	components: { AppBtn },
	beforeMount() {},
	mounted() {},
	unmounted() {},
	methods: {
		startTheShow() {
			this.$refs.audioPlayer.play();
			this.started = true;
			// localStorage.setItem('hasStarted',true)
		},
	},
	data() {
		return {
			started: Boolean(localStorage.getItem('hasStarted')),
			isMuted: false,
			content: {
				title: 'Scrolling Text Effect',
				paragraphs: [
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maiores aut cupiditate unde ipsam ut fugit deleniti non autem, ab, tempore ratione quo, nihil delectus sequi incidunt voluptates quis. Expedita!',
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maiores aut cupiditate unde ipsam ut fugit deleniti non autem, ab, tempore ratione quo, nihil delectus sequi incidunt voluptates quis. Expedita!',
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maiores aut cupiditate unde ipsam ut fugit deleniti non autem, ab, tempore ratione quo, nihil delectus sequi incidunt voluptates quis. Expedita!',
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maiores aut cupiditate unde ipsam ut fugit deleniti non autem, ab, tempore ratione quo, nihil delectus sequi incidunt voluptates quis. Expedita!',
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maiores aut cupiditate unde ipsam ut fugit deleniti non autem, ab, tempore ratione quo, nihil delectus sequi incidunt voluptates quis. Expedita!',
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maiores aut cupiditate unde ipsam ut fugit deleniti non autem, ab, tempore ratione quo, nihil delectus sequi incidunt voluptates quis. Expedita!'
				]
			}
		}
	},
}
</script> 
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap');

.dark-div {
	display: flex;
	position: absolute;
	height: 80%;
	z-index: 1;
	width: 100%;
	position: absolute;
	top: 0;
	background: linear-gradient(180deg, rgba(20, 20, 20, 1) 40%, rgba(20, 20, 20, 0) 100%);

	img {
		margin: auto;
		margin: 5% auto;
		width: auto;
	}

	img.initial {
		height: 45vh;
	}

	img.started {
		animation: zoomOut 40s linear forwards;
	}
}


@keyframes zoomOut {
	from {
		height: 45vh;
	}

	to {
		height: 1vh;
		opacity: 0;
	}
}

.parent {
	background: transparent;
	overflow: hidden;
	font-family: 'Roboto';
	/* push down the the wrapper by half the page */
	position: relative;
	max-height: 100vh;
	overflow: hidden;
}

.wrapper {
	display: flex;
	height: 100%;
	width: 80%;
	margin: 0 auto;
	/* perspective gives us a 3d space within the element to work with*/
	/* perspective also has the effect of pushing the content "down" */
	perspective: 450px;
}

.scroll-text {
	color: #ffc909;
	font-size: 3vw;
	line-height: 1.5em;
	font-weight: bold;
	text-align: justify;
	position: relative;
}

.scroll-text.started {
	animation: scroll 500s linear forwards;
}

.scroll-text.initial {
	opacity: 0;
}

h1,
h2 {
	text-align: center;
}

@keyframes scroll {
	from {
		top: 200px;
		transform: translateZ(0) rotateX(20deg);
	}

	to {
		top: -8900px;
		transform: translateZ(-2500px) rotateX(21deg);
	}
}</style> 