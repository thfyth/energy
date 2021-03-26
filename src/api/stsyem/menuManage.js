import { get,post,put,deletefn } from '@/utils/request'


//新增一个用户菜单关系
export function addMenuRel(data){
    return post('admin/usermenu/insert',data)
}

// 更新一个用户菜单关系
export function updataMenuRel(data){
    return put('admin/usermenu/update',data)
}
// 批量删除用户菜单
export function delMenuRel(data){
    return deletefn('admin/usermenu/delete',data)
}
// 通过用户查询菜单关系
export function selectUserMenuRel(data){
    return get('admin/usermenu/selectUserMenu',data)
}


//批量删除菜单
export function delMenu(data){
    return deletefn('admin/menu/delete',data)
}

//通过id查询菜单
export function getByIdMenu(data){
    return get('admin/menu',data)
}

// 更新一个菜单
export function updataMenu(data){
    return put('admin/menu/update',data)
}
// 分页查询菜单列表
export function selectMenu(data){
    return post('admin/menu/selectAll',data)
}
// 新增一个菜单
export function addMenu(data){
    return post('admin/menu/insert',data)
}

// 新增一个角色
export function addRole(data){
    return post('admin/role/insert',data)
}
// 批量删除角色
export function delRole(data){
    return deletefn('admin/role/delete',data)
}
// 查询角色列表
export function selectRole(data){
    return get('admin/role/selectAll',data)
}
// 更新一个角色
export function updataRole(data){
    return post('admin/role/update',data)
}

// 新增一个角色菜单关系
export function addRoleMenu(data){
    return post('admin/rolemenu/insert',data)
}

// 通过角色查询菜单关系
export function selectRoleMenu(data){
    return get('admin/rolemenu/selectRoleMenu',data)
}