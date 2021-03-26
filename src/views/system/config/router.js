const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'system',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '系统视图' }
    }
  ]
}
export default router
