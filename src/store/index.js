import { createStore } from 'vuex';
import ICON_DATA from '../data/icons_data.json';

const LOCAL_STORAGE_OLD_KEY="iconsObj"
const LOCAL_STORAGE_KEY="appIconObj"

const store = createStore({
  modules: {},
  state () {
    return {
      iconsList:Object.keys(ICON_DATA).map(k => ({ name: k, frequency: ICON_DATA[k] })),
      cart: [],
      finalizedCarts: []
    };
	},
  mutations: {
    SAVE_TO_LOCAL_STORAGE(state) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.finalizedCarts));
    },
    // Cart operations
    ADD_TO_CART(state, icon) {
      const existingIcon = state.cart.find(i => i.name === icon.name);
      if (!existingIcon) state.cart=[...state.cart,icon];
    },
    REMOVE_FROM_CART(state, iconName) {
      state.cart = state.cart.filter(icon => icon.name !== iconName);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    // SELECT_PRIMARY_ICON(state, iconName) {
    //   state.cart = state.cart.map(icon => ({
    //     ...icon,
    //     isPrimary: icon.name === iconName
    //   }));
    // },
    // CHANGE_PRIMARY_ICON(state, iconName) {
    //   const icon = state.cart.find(icon => icon.name === iconName);
    //   if (icon) {
    //     state.cart.forEach(icon => (icon.isPrimary = false));
    //     icon.isPrimary = true;
    //   }
    // },
    SAVE_CART(state,primartIconName) {
      state.finalizedCarts.push({
        primaryIcon:primartIconName,
        family: [...state.cart]
      });
      state.cart = [];
      this.commit('SAVE_TO_LOCAL_STORAGE');
    },

    // Finalized carts operations
    ADD_TO_FINALIZED_CARTS(state, payload) {
      state.finalizedCarts.push(payload);
      this.commit('SAVE_TO_LOCAL_STORAGE');
    },
    REMOVE_FROM_FINALIZED_CARTS(state, primaryIconName) {
      state.finalizedCarts = state.finalizedCarts.filter(
        cart => cart.primaryIcon !== primaryIconName
      );
      this.commit('SAVE_TO_LOCAL_STORAGE');
    },
    UPDATE_FINALIZED_CART_FAMILY(state, { primaryIconName, family }) {
      const cart = state.finalizedCarts.find(
        cart => cart.primaryIcon === primaryIconName
      );
      if (cart) {
        cart.family = family;
        this.commit('SAVE_TO_LOCAL_STORAGE');
      }
    },
    REMOVE_ICON_FROM_FAMILY(state, { primaryIconName, iconName }) {
      const cart = state.finalizedCarts.find(
        cart => cart.primaryIcon === primaryIconName
      );
      if (cart) {
        cart.family = cart.family.filter(icon => icon.name !== iconName);
        this.commit('SAVE_TO_LOCAL_STORAGE');
      }
    },
    ADD_ICON_TO_FAMILY(state, { primaryIconName, icon }) {
      const cart = state.finalizedCarts.find(
        cart => cart.primaryIcon === primaryIconName
      );
      if (cart) {
        const existingIcon = cart.family.find(i => i.name === icon.name);
        if (!existingIcon) {
          cart.family.push({ ...icon });
        } else {
          existingIcon.frequency++;
        }
        this.commit('SAVE_TO_LOCAL_STORAGE');
      }
    },
		async setInitialData(state){
			const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
			state.finalizedCarts=storedData || []
		},
		async migrateData(state){
			if(JSON.parse(localStorage.getItem('updated'))) return;

			const oldObj=JSON.parse(localStorage.getItem(LOCAL_STORAGE_OLD_KEY));
			if(!oldObj) return;
			const newObj=[]
			Object.keys(oldObj).forEach(prName=>{
				const family=oldObj[prName].map((iconName=>state.iconsList.find(i=>i.name==iconName)))
				newObj.push({
					primaryIcon:prName,
					family
				})
			})
			localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(newObj))
			JSON.parse(localStorage.setItem('updated',true))
		}
  },
	actions:{
    async initializeStore({ commit }) {
			await commit('migrateData')
			await commit('setInitialData')
    }
  },
  getters: {
    getCart: state => state.cart,
    getIconsList: state => state.iconsList,
    getFinalizedCarts: state => state.finalizedCarts,
    getFinalizedIcons: state => state.finalizedCarts.reduce((acc,curr)=>[...acc,...curr.family.map(i=>i.name)],[]),
		getCopyContent: state=> state.finalizedCarts.map(coll=>({...coll,family:coll.family.map(i=>i.name)}))
  }

});

export default store