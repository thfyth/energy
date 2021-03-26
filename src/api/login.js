import { get,post,put,deletefn } from '@/utils/request'


//后台管理登录
export function login(data){
    return post('oauth/authorize/admin/login',data)
}
// 后台管理退出
export function logout(data){
    return get('oauth/authorize/logout',data)
}

// 登录用户查询菜单关系
export function getInfo(){
    return get('admin/rolemenu/selectUserMenu')
}

