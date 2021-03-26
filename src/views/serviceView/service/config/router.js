const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'service',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '服务管理' }
    }
  ]
}
export default router
