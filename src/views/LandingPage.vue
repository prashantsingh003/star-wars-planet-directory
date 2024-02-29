<template>
  <div class="wrapper">
    <div class="scroll-text">
      <h1>STAR WARS</h1>
      <h2>{{content.title}}</h2>
      <p v-for="(para,index) in content.paragraphs" :key="index+'para'">
				{{ para }}
			</p>
		</div>
  </div>
</template>

<script>
export default{
	name:'LandingPage',
	data(){
		return{
			content:{
				title:'Scrolling Text Effect',
				paragraphs:[
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