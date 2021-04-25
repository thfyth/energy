import { get,post,put,deletefn } from '@/utils/request'


/* 合同管理 */

// 新增一个合同
export function addContract(data){
    return post('admin/contract/insert',data)
}

// 删除合同
export function delContract(data){
    return deletefn('admin/contract/delete',data)
}

// 通过客户名称查询合同编号
export function getIdContract(data){
    return get('admin/contract/getContractInfo',data)
}

// 分页查询合同列表
export function selectContract(data){
    return get('admin/contract/selectAll',data)
}

// 更新一个合同
export function updataContract(data){
    return put('admin/contract/update',data)
}

/* 客户管理 */


// 删除客户
export function delCustomer(data){
    return deletefn('admin/customer/delete',data)
}
// 新增一个客户
export function addCustomer(data){
    return post('admin/customer/insert',data)
}
// 分页查询客户列表
export function selectCustomer(data){
    return get('admin/customer/selectAll',data)
}
// 更新一个客户
export function updataCustomer(data){
    return put('admin/customer/update',data)
}

/* 诉求管理 */


// 更新一个诉求
export function updataAppeal(data){
    return put('admin/appeal/update',data)
}
// 批量删除诉求
export function delAppeal(data){
    return deletefn('admin/appeal/delete',data)
}
// 新增一个诉求
export function addAppeal(data){
    return post('admin/appeal/insert',data)
}
// 查询诉求列表
export function selectAppeal(data){
    return get('admin/appeal/selectAll',data)
}

/* 报修管理 */

// 查询报修列表
export function selectReport(data){
    return get('admin/reportrepair/selectAll',data)
}
// 删除报修
export function delReport(data){
    return deletefn('admin/reportrepair/delete',data)
}
// 新增一个报修
export function addReport(data){
    return post('admin/reportrepair/insert',data)
}
// 更新一个报修
export function updataReport(data){
    return put('admin/reportrepair/update',data)
}

/* 推送消息管理 */

// 更新一个消息
export function updaMsg(data){
    return put('admin/pushmsg/update',data)
}
// 删除消息
export function delMsg(data){
    return deletefn('admin/pushmsg/delete',data)
}
// 新增一个消息
export function addMsg(data){
    return post('admin/pushmsg/insert',data)
}
// 查询消息列表
export function selectMsg(data){
    return get('admin/pushmsg/selectAll',data)
}

/* 服务回访 */

// 删除服务回访
export function delVisit(data){
    return deletefn('admin/servicevisit/delete',data)
}
// 查询服务回访列表
export function selectVisit(data){
    return get('admin/servicevisit/selectAll',data)
}
// 更新一个服务回访
export function updataVisit(data){
    return put('admin/servicevisit/update',data)
}

/* 缴费记录信息 */


// 通过合同查询所有缴费记录
export function selectPayrecord(data){
    return get('admin/payrecord/selectAll',data)
}
// 通过id查询缴费记录信息
export function getByIdPay(data){
    return get('admin/payrecord/'+data)
}
// 删除缴费记录
export function delPayrecord(data){
    return deletefn('admin/payrecord/delete',data)
}
// 新增缴费记录
export function addPayrecord(data){
    return post('admin/payrecord/insert',data)
}
// 更新缴费记录信息
export function updataPayrecord(data){
    return put('admin/payrecord/update',data)
}
