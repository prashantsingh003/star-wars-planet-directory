<template>
	<div class="primary-container">
		<div class="card control-panel">
			<nile-button @click="handleSort()">
				Sort
				<nile-icon :name="sort ? 'step_out' : 'step_into'"></nile-icon>
			</nile-button>
			<nile-button @click="handleAlphaSort()">
				Sort (A-Z)
				<nile-icon :name="azSort ? 'arrowleft' : 'arrowright'"></nile-icon>
			</nile-button>
			<nile-input :value="search" @nile-input="handleInput()" placeholder="Search"></nile-input>
		</div>

		<div class="card control-panel">
			<nile-button variant="secondary-blue">Total Count: {{ filteredIcons.length }}</nile-button>
			<nile-button variant="secondary-blue">
				Zero Count: {{ filteredIcons.reduce((acc, curr) => acc + Number(curr.frequency === 0), 0) }}
			</nile-button>
		</div>
		<div class="icons-container card">
			<nile-tooltip v-for="(icon, index) in filteredIcons" :key="icon.name" :content="icon.name">
				<div class="icon-div">
					<div>
						<nile-badge :variant="icon.frequency ? 'info' : 'error'">{{ icon.frequency }}</nile-badge>
					</div>
					<div><nile-icon :name="icon.name" size="32"></nile-icon></div>
				</div>
			</nile-tooltip>
		</div>
	</div>
</template>
<script>
import ICON_DATA from '../data/icons_data.json';
export default {
	name: 'app-icon-preview',
	data() {
		return {
			iconFreq:Object.keys(ICON_DATA).map(k=>({name:k,frequency:ICON_DATA[k]})),
			iconsData: [],
			sort:false,
			azSort:false,
			filteredIcons:[],
			search:'',
		}
	},
	beforeMount() { },
	mounted() {
		this.filteredIcons=this.iconFreq
	},
	unmounted() { },
	methods: {
		setIconsData() { },
		handleSort() {
			if (this.sort) {
				this.filteredIcons.sort((a, b) => a.frequency < b.frequency ? 1 : -1)
				this.sort = false;
			}
			else {
				this.filteredIcons.sort((a, b) => a.frequency > b.frequency ? 1 : -1)
				this.sort = true;
			}
		},
		handleAlphaSort() {
			if (this.azSort) {
				this.filteredIcons.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				})
				this.azSort = false;
			}
			else {
				this.filteredIcons.sort((a, b) => {
					if (a.name > b.name) {
						return -1;
					}
					if (a.name < b.name) {
						return 1;
					}
					return 0;
				})
				this.azSort = true;
			}
		},
		handleInput(e) {
			this.search = e.detail.value;
			this.filteredIcons = this.iconFreq.filter(i => i.name.toLowerCase().includes(this.search.toLowerCase()))
		}
	},
}
</script>
<style>
.primary-container{
	padding: 10px;
}
.control-panel{
	display: flex;
	gap:20px;
}
.control-panel>nile-input{
	flex:1;
}
.icons-container{
	overflow-y: auto;
	max-height: calc(100vh - 240px);

	display:flex;
	flex-wrap:wrap;
	gap:10px;
	padding:10px;
}

/* Card Container */
.card {
	padding: 15px;
	background-color: #fff3;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s, box-shadow 0.2s;
	margin: 20px;
}

.icon-div{
	display:flex;
	flex-direction:column;
	align-items:center;
	gap:5px;
	aspect-ratio: 1 / 1;

	transition-duration: 200ms;
	padding: 10px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin: 10px;
}

.icon-div:hover{
	scale:1.5;
}
/* Hover effect */
.card:hover {
	/* transform: translateY(-5px); */
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>