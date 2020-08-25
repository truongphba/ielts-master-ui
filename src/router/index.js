
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueCountdownTimer from 'vuejs-countdown-timer'
import axios from "axios";


Vue.use(VueRouter)
Vue.use(VueCountdownTimer)
Vue.prototype.$getCookie = function(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// Vue.prototype.$user = function (){
//   axios.get(process.env.API_URL + '/auth', {
//     headers: {Authorization : this.$getCookie('Authorization')}
//   })
//     .then(response => {
//       return response.data.user;
//
//     })
//     .catch(error => {
//       document.cookie = 'Authorization=' + this.$getCookie('Authorization') +'; expires=Thu, 01 Jan 1970 00:00:00 UTC';
//       window.location.href = '/login'
//     })
// }

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}

