<template>
	<div class="primary-container">
		<!-- DATA CONTROL PANEL -->
		<div class="card control-panel">
			<nile-button @click="handleSort()">
				Sort
				<nile-icon :name="sort ? 'step_out' : 'step_into'"></nile-icon>
			</nile-button>
			<nile-button @click="handleAlphaSort()">
				Sort (A-Z)
				<nile-icon :name="azSort ? 'arrowleft' : 'arrowright'"></nile-icon>
			</nile-button>
			<nile-input :value="search" @nile-input="handleInput" placeholder="Search"></nile-input>
			<div style="display: flex; gap: 10px;">
				<nile-slide-toggle label="Names" :isChecked="showNames" @nile-change="(e) => showNames = e.detail.checked">
				</nile-slide-toggle>
				<nile-slide-toggle label="Enable Cart" :isChecked="cartEnabled" @nile-change="(e) => cartEnabled = e.detail.checked">
				</nile-slide-toggle>
				<nile-slide-toggle label="Highlight Zero" :isChecked="highlightZero" @nile-change="(e) => highlightZero = e.detail.checked">
				</nile-slide-toggle>
			</div>
		</div>

		<!-- CARD DATA PANEL -->
		<div class="card data-panel">
			<nile-button variant="secondary-blue">Total Count: {{ filteredIcons.length }}</nile-button>
			<nile-button variant="secondary-blue">
				Zero Count: {{ filteredIcons.reduce((acc, curr) => acc + Number(curr.frequency === 0), 0) }}
			</nile-button>
			<v-spacer></v-spacer>
			<v-badge :content="inCartIconLength">
				<nile-button @click="dialog=!dialog">
					Cart
				</nile-button>
			</v-badge>
			<nile-button @click="copyToClipboard()">
				Copy Cart
			</nile-button>
			<nile-button @click="showRemainingIcons()">
				Show Remaining Icons
			</nile-button>
			<nile-button @click="filteredIcons=iconFreq">
				Reset
			</nile-button>
		</div>

		<!-- LISTED ICONS -->
			<IconList 
				:icons="filteredIcons" 
				:cart="cart"
				:cartEnabled="cartEnabled"
				:showNames="showNames"
				:highlightZero="highlightZero"
				@icon-click="(icon)=>cartEnabled ? iconClick(icon) : null"
			/>

		<IconCart 
			:icons="cart" 
      :showNames="showNames"
			@save-cart="saveCart"
			@remove-icon="removeFromCart" 
			@clear-cart="cart = []" 
			:highlightZero="highlightZero"
			v-if="cart.length"> </IconCart>
			
		<v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
			<IconCollection 
				@delete-family="deleteFamily" 
				@update-family="updateFamily"
				:IconCollection="savediconsObj"/>
		</v-dialog>
	</div>
</template>
<script>
import ICON_DATA from '../data/icons_data.json';
import IconCart from './IconCart.vue'
import IconCollection from './IconCollection.vue';
import IconList from './IconList.vue'
export default {
	name: 'app-icon-preview',
	components: { IconCart,IconList,IconCollection },
	data() {
		return {
			iconFreq: Object.keys(ICON_DATA).map(k => ({ name: k, frequency: ICON_DATA[k] })),
			iconsData: [],
			sort: false,
			azSort: false,
			showNames: false,
			filteredIcons: [],
			search: '',
			hoveredIcon: '',
			cartEnabled: true,
			cart: [],
			highlightZero:false,

			dialog:false,
			savediconsObj:localStorage.getItem('iconsObj')?JSON.parse(localStorage.getItem('iconsObj')):{}
		}
	},
	mounted() {
		this.filteredIcons = this.iconFreq
	},
	unmounted() { },
  watch: {
    savediconsObj: {
      handler(newVal) {
        this.saveToLocal(newVal);
      },
      deep: true,
    },
  },
	methods: {
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
		showRemainingIcons(){
			const selected=Object.keys(this.savediconsObj).reduce((acc,curr)=>([...acc,...this.savediconsObj[curr]]),[])
			console.log(selected,this.savediconsObj)
			this.filteredIcons=this.filteredIcons.filter(i=>!selected.includes(i.name))
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
		},
		iconClick(icon) {
			const isThere = this.cart.find(i => i == icon);
			if (isThere) this.removeFromCart(icon)
			else this.addToCart(icon)
		},
		addToCart(icon) {
			this.cart = [...this.cart,icon]
		},
		removeFromCart(icon) {
			this.cart = this.cart.filter(i => i !== icon)
		},
		getColor({ frequency, name }, hover) {
			if (this.cartEnabled && hover) {
				if (this.cart.includes(name)) return 'error';
				else return 'success'
			}
			else return 'error'
		},
		saveCart(primaryIcon){
			this.savediconsObj={...this.savediconsObj,...{[primaryIcon.name]:this.cart.map(i=>i.name)}}
			this.cart=[]
		},
		saveToLocal(val){
			localStorage.setItem('iconsObj',JSON.stringify(val))
		},
		deleteFamily(iconName){
			const keyToDelete = iconName;
			this.savediconsObj = Object.fromEntries(
				Object.entries(this.savediconsObj).filter(([key]) => key !== keyToDelete)
			);
		},
		copyToClipboard(){
			navigator.clipboard.writeText(JSON.stringify(this.savediconsObj, null, 2))
				.then(() => {
					alert("Object copied to clipboard successfully!");
				})
				.catch(err => {
						alert("Failed to copy object: ");
				})
		},
		updateFamily(iconName,newVal){
			const obj={}
			Object.keys(this.savediconsObj).forEach(icon=>{
				if(icon==iconName){
					obj[icon]=newVal;
				}
				else{
					obj[icon]=this.savediconsObj[icon]
				}
			})
		}
	},
	computed: {
		inCartIconLength(){
			return Object.keys(this.savediconsObj).reduce((acc,curr)=>acc+this.savediconsObj[curr].length,0)
		},
		badgeColor() {
			return (icon) => {
				if (this.cart.includes(icon.name)) return 'error';
				else if (this.cartEnabled && this.hoveredIcon == icon.name) return 'success';
				return 'primary'
			};
		},
		badgeContent() {
			return (icon) => {
				if (!this.cartEnabled || this.hoveredIcon !== icon.name) return icon.frequency;
				return this.cart.includes(icon.name) ? '-' : '+';
			};
		}
	}
}
</script>
<style>
/* Card Container */
.card {
	padding: 15px;
	background-color: #fff3;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s, box-shadow 0.2s;
	margin: 10px;
}

.card:hover {
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.primary-container {
	padding: 10px;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 99vh;
}

.control-panel,
.data-panel {
	display: flex;
	gap: 20px;
	align-items: center;
}

.control-panel>nile-input {
	flex: 1 0 none;
}

.control-panel {
	background-color: white;
}

.icon-name {
	max-width: 100%;
	overflow: auto;
	white-space: nowrap;
	padding: 0 10px;
}

.icon-name::-webkit-scrollbar {
	display: none;
}

/* Hover effect */
</style>