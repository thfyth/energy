const router = (path) => {
  return [{
    path: `/${path}`,
    name: 'mochaManage',
    component: resolve => require(['../index.vue'], resolve),
    meta: {
      title: '运维管理'
    }
  }]
}
export default router