import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // 需要再这个页面中添加

    {
      path: '/',
      name: 'home',
      component: HomeView,
      // component: ()=> import('../views/TestContent.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestContent.vue'),
    },
  ],
})

export default router
