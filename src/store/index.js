import { createStore } from 'vuex';
import ICON_DATA from '../data/icons_data.json';

const LOCAL_STORAGE_KEY="iconsObj"

const store = createStore({
  modules: {},
  state () {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		const finalizedCarts = storedData || []
		const iconsList=Object.keys(ICON_DATA).map(k => ({ name: k, frequency: ICON_DATA[k] }))
    return {
      iconsList,
      cart: [],
      finalizedCarts: finalizedCarts
    };
	},
  mutations: {
    SAVE_TO_LOCAL_STORAGE(state) {
      const data = {
        iconsList: state.iconsList,
        cart: state.cart,
        finalizedCarts: state.finalizedCarts
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    },

    // Cart operations
    ADD_TO_CART(state, icon) {
      const existingIcon = state.cart.find(i => i.name === icon.name);
      if (!existingIcon) {
        state.cart.push({ ...icon });
      } else {
        existingIcon.frequency++;
      }
      this.commit('SAVE_TO_LOCAL_STORAGE');
    },
    REMOVE_FROM_CART(state, iconName) {
      state.cart = state.cart.filter(icon => icon.name !== iconName);
      this.commit('SAVE_TO_LOCAL_STORAGE');
    },
    SELECT_PRIMARY_ICON(state, iconName) {
      state.cart = state.cart.map(icon => ({
        ...icon,
        isPrimary: icon.name === iconName
      }));
      this.commit('SAVE_TO_LOCAL_STORAGE');
    },
    CHANGE_PRIMARY_ICON(state, iconName) {
      const icon = state.cart.find(icon => icon.name === iconName);
      if (icon) {
        state.cart.forEach(icon => (icon.isPrimary = false));
        icon.isPrimary = true;
        this.commit('SAVE_TO_LOCAL_STORAGE');
      }
    },
    SAVE_CART(state) {
      const primaryIcon = state.cart.find(icon => icon.isPrimary)?.name || '';
      state.finalizedCarts.push({
        primaryIcon,
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
    }
  },
	actions:{
    initializeStore({ commit }) {
      const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedData) {
        commit('SET_ICONS_LIST', storedData.iconsList || []);
        commit('SET_CART', storedData.cart || []);
        commit('SET_FINALIZED_CARTS', storedData.finalizedCarts || []);
      }
    }
  },
  getters: {
    getCart: state => state.cart,
    getIconsList: state => state.iconsList,
    getFinalizedCarts: state => state.finalizedCarts
  }

});

export default store