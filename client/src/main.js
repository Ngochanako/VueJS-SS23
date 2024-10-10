import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Import MDI icons


const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // Use Material Design Icons
  },
  components,
  directives,
});
const app = createApp(App)
app.use(vuetify)
app.use(router)

app.mount('#app')
