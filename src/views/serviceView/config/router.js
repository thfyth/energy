const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'serviceView',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '服务视图' }
    }
  ]
}
export default router
