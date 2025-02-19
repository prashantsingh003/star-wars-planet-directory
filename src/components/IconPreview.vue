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
			<div>
				<nile-slide-toggle label="Names" :isChecked="showNames" @nile-change="(e) => showNames = e.detail.checked">
				</nile-slide-toggle>
				<nile-slide-toggle label="Carting" :isChecked="cartEnabled" @nile-change="(e) => cartEnabled = e.detail.checked">
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
			<v-badge :content="cart.length">
				<nile-button>
					Cart
				</nile-button>
			</v-badge>
		</div>

		<!-- LISTED ICONS -->
			<IconList 
				:icons="filteredIcons" 
				:cart="cart"
				:cartEnabled="cartEnabled"
				:showNames="showNames"
				@icon-click="(icon)=>cartEnabled ? iconClick(icon) : null"
			/>

		<IconCart 
			:icons="cart" 
      :showNames="showNames"
			@save-cart="saveCart"
			@remove-icon="removeFromCart" 
			@clear-cart="cart = []" 
			v-if="cart.length"> </IconCart>
	</div>
</template>
<script>
import ICON_DATA from '../data/icons_data.json';
import IconCart from './IconCart.vue'
import IconList from './IconList.vue'
export default {
	name: 'app-icon-preview',
	components: { IconCart,IconList },
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
			cart: []
		}
	},
	mounted() {
		this.filteredIcons = this.iconFreq
	},
	unmounted() { },
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
			console.log(primaryIcon)
		}
	},
	computed: {
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