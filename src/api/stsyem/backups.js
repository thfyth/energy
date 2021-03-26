// 系统备份

import { get,post,put,deletefn } from '@/utils/request'


//删除备份
export function delBackups(data){
    return deletefn('admin/backups/delete',data)
}
//新增一个备份
export function addBackups(data){
    return post('admin/backups/insert',data)
}
//查询备份列表
export function selectBackups(data){
    return get('admin/backups/selectAll',data)
}
//更新一个备份
export function updataBackups(data){
    return put('admin/backups/update',data)
}
