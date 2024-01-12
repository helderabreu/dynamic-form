import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import EditView from '@/views/EditView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/edit',
    name: 'edit',
    component: EditView
  },
  {
    path: '/render',
    name: 'render',
    component: () => import(/* webpackChunkName: "render" */ '../views/RenderView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/edit',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
