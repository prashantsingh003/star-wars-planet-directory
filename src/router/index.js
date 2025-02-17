import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'

import Layout from '../views/Layout.vue'
import LandingPage from '../views/LandingPage.vue';
import DataView from '../views/Data.vue';
import PageNotFound from '../pages/PageNotFound.vue'
import Dashboard from '../pages/Dashboard.vue';
import Iconpreview from '../components/IconPreview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
      meta: { layout: Layout },
    },
    {
      path: '/data',
      name: 'Data',
      component: DataView,
      children: [
        {
          path: '',
          component: Iconpreview,
        },
        {
          path: 'icon-preview',
          component: Iconpreview,
        },
      ],
    },
    // ADD PATH ABOVE THIS LINE
    {
      path: "/:pathMatch(.*)",
      redirect: { name: 'PageNotFound' },
    },
    {
      path: "/pageNotFound",
      component: PageNotFound,
      name: "PageNotFound",
      meta: { layout: Layout },
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    else return {left: 0, top: 0}
  }
})

export default router