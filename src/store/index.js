import { createStore } from 'vuex';

const store = createStore({
  modules: {},
  state () {
		return {
			pageNumber:1
		}
	},
  mutations: {},
	actions:{
		async fetchPlanets(context){}
	}
});

export default store