const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'adminAddInfo',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '菜单设置' }
    }
  ]
}
export default router
