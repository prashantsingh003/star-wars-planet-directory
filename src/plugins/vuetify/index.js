// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
// Fonts refrence: https://pictogrammers.com/library/mdi/

// import lightTheme from './lightTheme';
// import darkTheme from './darkTheme';
import Defaults from './elementDefaults'
// import store from '../../store'

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const defaultTheme = Boolean(JSON.parse(localStorage.getItem('darkMode')))?'dark':'light';

// store.commit('setDarkModeValue', defaultTheme=="dark")

// Refrence for theme colors https://vuetifyjs.com/en/features/theme/
const vuetify = createVuetify({ 
  defaults: Defaults,
  theme: {
    defaultTheme: 'dark',
    themes: {
    },
  },
  icons: {
    defaultSet: 'mdi', // mdi is already the default value - only for display purposes
  },
  components,
  directives
});
export default vuetify;