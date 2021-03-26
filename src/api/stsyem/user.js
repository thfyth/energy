import { get,post,put,deletefn } from '@/utils/request'


// 通过id查询用户
export function getByIdUser(data){
    return get('admin/user/?userId='+data)
}

// 批量删除用户
export function delUser(data){
    return deletefn('admin/user/delete',data)
}
// 新增一个用户
export function addUser(data){
    return post('admin/user/insert',data)
}
// 分页查询用户列表
export function selectUser(data){
    return post('admin/user/selectAll',data)
}
// 更新一个用户
export function updataUser(data){
    return put('admin/user/update',data)
}
