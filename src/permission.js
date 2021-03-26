import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import { getToken } from '@/utils/auth' 
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })  

const whiteList = ['/login']  

router.beforeEach(async(to, from, next) => {
  //头部加载进度条
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          //获取用户权限、个人、菜单信息
          
          const data = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', data)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          //删除token，跳转到登陆页
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 不存在token*/

    if (whiteList.indexOf(to.path) !== -1) {
      //重定向到登陆页
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
