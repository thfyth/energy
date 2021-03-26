const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'mochaViewView',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '运维视图' }
    }
  ]
}
export default router
