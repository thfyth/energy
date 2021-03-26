import { get } from '@/utils/request'


//刪除文件
export function delFiles(data){
    return get('admin/file/delFiles',data)
}
