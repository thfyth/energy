const router = (path) => {
  return [
    {
      path: `/${path}`,
      name: 'systemManage',
      component: resolve => require(['../index.vue'], resolve),
      meta: { title: '系统管理' }
    }
  ]
}
export default router
