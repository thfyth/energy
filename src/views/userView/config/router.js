const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'userView',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '用户管理' }
    }
  ]
}
export default router
