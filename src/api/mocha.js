import { get,post,put,deletefn } from '@/utils/request'


// 获取所有设备名称
export function getEquName(data){
    return get('admin/equipment/getEquipmentName',data)
}
// 通过id查询设备运行信息
export function getIdEqu(data){
    return get('admin/equipmentruning',data)
}
//删除设备运行
export function delEqu(data){
    return deletefn('admin/equipmentruning/delete',data)
}
//新增设备运行
export function addEqu(data){
    return post('admin/equipmentruning/insert',data)
}
//分页查询设备运行列表
export function selectEqu(data){
    return post('admin/equipmentruning/selectAll',data)
}
//更新设备运行信息
export function updataEqu(data){
    return put('admin/equipmentruning/update',data)
}

//设备运行审批
export function approvalEqu(data){
    return get('admin/equipmentruning/approval',data)
}



/* 设备验收 */

// 通过id查询设备验收信息
export function getIdAcc(data){
    return get('admin/equipment/'+data)
}
// 删除设备验收信息
export function delAcc(data){
    return deletefn('admin/equipment/delete',data)
}
// 新增设备验收
export function addAcc(data){
    return post('admin/equipment/insert',data)
}
// 分页查询设备验收列表
export function selectAcc(data){
    return post('admin/equipment/selectAll',data)
}
// 更新设备验收信息
export function updataAcc(data){
    return put('admin/equipment/update',data)
}
// 获取设备类别
export function getEquipmentType(data){
    return get('admin/equipment/getEquipmentType',data)
}

/* 设备库 */


// 通过id查询设备库信息
export function getByIdEquLib(data){
    return get('admin/equipmentlib',data)
}
// 删除设备库
export function delEquLib(data){
    return deletefn('admin/equipmentlib/delete',data)
}
// 新增设备库
export function addEquLib(data){
    return post('admin/equipmentlib/insert',data)
}
// 查询所有设备库信息
export function selectEquLib(data){
    return get('admin/equipmentlib/selectAll',data)
}
// 更新设备库信息
export function updataEquLib(data){
    return put('admin/equipmentlib/update',data)
}



/* 巡检计划 */

// 通过id查询巡检计划信息
export function getInspectplan(data){
    return get('admin/inspectplan/'+data)
}
//删除巡检计划
export function delInspectplan(data){
    return deletefn('admin/inspectplan/delete',data)
}
//新增巡检计划
export function addInspectplan(data){
    return post('admin/inspectplan/insert',data)
}
//分页查询巡检计划列表
export function selectInspectplan(data){
    return post('admin/inspectplan/selectAll',data)
}
//更新巡检计划信息
export function updataInspectplan(data){
    return put('admin/inspectplan/update',data)
}
//巡检审批
export function approvalInsp(data){
    return get('admin/inspectplan/approval',data)
}


//通过id查询巡检记录信息
export function getByIdRecord(data){
    return get('admin/inspectrecord/'+data)
}

//新增巡检记录
export function addRecord(data){
    return post('admin/inspectrecord/insert',data)
}
//分页查询巡检记录列表
export function selectRecord(data){
    return post('admin/inspectrecord/selectAll',data)
}

//更新巡检记录信息
export function updataRecord(data){
    return put('admin/inspectrecord/update',data)
}



/* 缺陷报告 */


//分页查询缺陷报告列表
export function selectDefect(data){
    return post('admin/defectreport/selectAll',data)
}
//新增缺陷报告
export function addDefect(data){
    return post('admin/defectreport/insert',data)
}
//删除缺陷报告
export function delDefect(data){
    return deletefn('admin/defectreport/delete',data)
}
//更新缺陷报告信息
export function updataDefect(data){
    return put('admin/defectreport/update',data)
}
//通过id查询缺陷报告信息
export function getByIdDefect(data){
    return get('admin/defectreport/'+data)
}

//新增缺陷报告审批
export function approvalDefct(data){
    return get('admin/defectreport/approval',data)
}


/* 维修计划 */

//通过id查询维修计划信息
export function getByIdRepair(data){
    return get('admin/repair/'+data)
}
//删除维修计划
export function delRepair(data){
    return deletefn('admin/repair/delete',data)
}
//新增维修计划
export function addRepair(data){
    return post('admin/repair/insert',data)
}
//分页查询维修计划列表
export function selectRepair(data){
    return post('admin/repair/selectAll',data)
}
//更新维修计划信息
export function updataRepair(data){
    return put('admin/repair/update',data)
}
//维修计划审批
export function approvalRepair(data){
    return get('admin/repair/approval',data)
}


//通过id查询维修记录信息
export function getByIdRepairRecord(data){
    return get('admin/repairrecord/'+data)
}
//删除维修记录
export function delRepairRecord(data){
    return deletefn('admin/repairrecord/delete',data)
}
//新增维修记录
export function addRepairRecord(data){
    return post('admin/repairrecord/insert',data)
}
//分页查询维修记录列表
export function selectRepairRecord(data){
    return post('admin/repairrecord/selectAll',data)
}
//更新维修记录信息
export function updataRepairRecord(data){
    return put('admin/repairrecord/update',data)
}


/* 报废计划 */

//更新报废计划信息
export function updataScrap(data){
    return put('admin/scrap/update',data)
}
//新增报废计划
export function addScrap(data){
    return post('admin/scrap/insert',data)
}
//分页查询报废计划列表
export function selectScrap(data){
    return post('admin/scrap/selectAll',data)
}
//删除报废计划
export function delScrap(data){
    return deletefn('admin/scrap/delete',data)
}
//通过id查询报废计划信息
export function getByIdScrap(data){
    return get('admin/scrap/'+data)
}
//报废计划审批
export function approvalScrap(data){
    return get('admin/scrap/approval',data)
}
// 报废记录

//通过id查询报废记录信息
export function getByIdScrapRecord(data){
    return get('admin/scraprecord/'+data)
}
//分页查询报废记录列表
export function selectScrapRecord(data){
    return post('admin/scraprecord/selectAll',data)
}
//新增报废记录
export function addScrapRecord(data){
    return post('admin/scraprecord/insert',data)
}
//删除报废记录
export function delScrapRecord(data){
    return deletefn('admin/scraprecord/delete',data)
}
//更新报废记录信息
export function updataScrapRecord(data){
    return put('admin/scraprecord/update',data)
}


/* 维护保养计划 */

//新增维护保养计划
export function addMaintenance(data){
    return post('admin/maintenance/insert',data)
}
//通过id查询维护保养计划信息
export function getByIdMaintenance(data){
    return get('admin/maintenance/'+data)
}
//删除维护保养计划
export function delMaintenance(data){
    return deletefn('admin/maintenance/delete',data)
}
//分页查询维护保养计划列表
export function selectMaintenance(data){
    return post('admin/maintenance/selectAll',data)
}
//更新维护保养计划信息
export function updataMaintenance(data){
    return put('admin/maintenance/update',data)
}
//维护审批
export function approvalMainten(data){
    return get('admin/maintenance/approval',data)
}

//新增维护保养记录
export function addMaintenanceRecord(data){
    return post('admin/maintenancerecord/insert',data)
}
//通过id查询维护保养记录信息
export function getByIdMaintenanceRecord(data){
    return get('admin/maintenancerecord/'+data)
}
//删除维护保养记录
export function delMaintenanceRecord(data){
    return deletefn('admin/maintenancerecord/delete',data)
}
//分页查询维护保养记录列表
export function selectMaintenanceRecord(data){
    return post('admin/maintenancerecord/selectAll',data)
}
//更新维护保养记录信息
export function updataMaintenanceRecord(data){
    return put('admin/maintenancerecord/update',data)
}
/* 台账管理 */


//查询台账详细信息
export function getStandingbookDetail(data){
    return get('admin/standingbook/getDetail',data)
}
//查询台账信息
export function selectStandingbook(data){
    return get('admin/standingbook/getRecord',data)
}
//修改台账信息
export function updataStandingbook(data){
    return post('admin/standingbook/update',data)
}
//删除台账信息
export function delStandingbook(data){
    return get('admin/standingbook/delete',data)
}
//自动检查设备运行状态
export function findRuningStatus(data){
    return get('admin/standingbook/findRuningStatus',data)
}


/* 能源站、区域管理 */

//查询能源站
export function selectEnergyStation(data){
    return get('admin/energystation/selectAll',data)
}
//删除能源站
export function delEnergyStation(data){
    return deletefn('admin/energystation/delete',data)
}
//新增一个能源站
export function addEnergyStation(data){
    return post('admin/energystation/insert',data)
}
//更新能源站
export function updataEnergyStation(data){
    return put('admin/energystation/update',data)
}

//查询区域
export function selectArea(data){
    return get('admin/area/selectAll',data)
}
//删除区域
export function delArea(data){
    return deletefn('admin/area/delete',data)
}
//新增一个区域
export function addArea(data){
    return post('admin/area/insert',data)
}
//更新一个区域
export function updataArea(data){
    return put('admin/area/update',data)
}

