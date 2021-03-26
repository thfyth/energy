import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '首页', icon: 'dashboard' }
        },
        
    ]
  },
  {
    path: '/adminAddInfo',
    name: 'adminAddInfo',
    component: Layout,
    
    meta: { title: '菜单设置', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/system/adminAddInfo'),
        meta: { title: '菜单管理', icon: 'dashboard' }
      },
      
  ]
  },

  {
    path: '/404',
    component: Layout,
    hidden: true,
    redirect: '/404',
    children: [
      {
        path: '/404',
        name: 'redirect',
        meta: { noCache: true, title: '404' },
        component: () => import('@/views/404'),
      }
    ]
  },
]


const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
