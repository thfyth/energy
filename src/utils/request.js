import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router' //引入router
let loadingRequestCount = 0
let loadingInstance
const showLoading = () => {
	if (loadingRequestCount === 0) {
		loadingInstance = Loading.service({
			target: document.querySelector('.app-main'),
			lock: true,
			text: '加载中……',
			background: 'rgba(0, 0, 0, 0.5)',
		})
	}
	loadingRequestCount++
}
const hideLoading = () => {
	loadingRequestCount--
	if (loadingRequestCount === 0) {
		loadingInstance.close()
	}
	if (loadingRequestCount <= 0) return
}
// 创建实例
const service = axios.create({
	timeout: 20000, // 超时时间
	baseURL: 'http://47.92.201.212:6004/api/', // 公共地址
	// baseURL: 'http://mz4evm.natappfree.cc/api/', // 公共地址

	// /swagger-ui.html
})

// // request interceptor
service.interceptors.request.use(
	(config) => {
		showLoading(config)
		if (store.getters.token) {
			if (getToken() !== 'undefined') {
				config.headers['Authorization'] = 'Bearer ' + getToken()
			}
		} else {
			config.headers['Authorization'] = 'Basic Y3VybF9jbGllbnQ6c2VjcmV0'
		}
		return config
	},
	(error) => {
		setTimeout(() => {
			hideLoading()
		}, 200)
		return Promise.reject(error)
	}
)

// 请求拦截
service.interceptors.response.use(
	(response) => {
		const res = response.data
		hideLoading()
		if (res.code === -1) {
			localStorage.clear()
			store.dispatch('user/resetToken').then(() => {
				router.replace({
					path: '/login',
					query: {
						redirect: '/',
					},
				})
				// router.push("/login");
			})
		} else {
			return res
		}
		// 	store.dispatch("user/setUserStaus", true);
		// 	store.dispatch("user/setErrMsg", res.message);
		// 	Message.error(res.message);
		// 	return Promise.reject(new Error(res.message || 'Error'));
		// 	//判断状态
		// } else if (res.code == 400 || res.code == 120 || res.code == 500) {
		// 	// router.go(0);
		// 	Message.error(res.message);
		// } else if (res.code === 0 || res.code === 404 || res.code === 410) {
		// 	return response;
		// } else {
		// 	Message.error(res.message);
		// 	return response;
		// }
		// console.log(res);

		// if(res.code === 0){
		// 	return res;
		// }else{
		// 	Message.error(res.message);
		// }
	},
	(error) => {
		hideLoading()
		Message.error('网络连接失败')
		return Promise.reject(error)
	}
)

export function get(url, params) {
	// JSON.parse(JSON.stringify(params)))
	// console.log(JSON.parse(JSON.stringify(params)))
	return new Promise((resolve, reject) => {
		service
			.get(url, { params })
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err.data)
			})
	})
}
export function post(url, params) {
	return new Promise((resolve, reject) => {
		service
			.post(url, params)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err.msg)
			})
	})
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
	return new Promise((resolve, reject) => {
		service
			.put(url, params)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err.msg)
			})
	})
}

/**
 * delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(url, params) {
	return new Promise((resolve, reject) => {
		service
			.delete(url, { params })
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err.msg)
			})
	})
}
/**
 * 下载文件流
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function down(url, params) {
	return new Promise((resolve, reject) => {
		service({
			method: 'post',
			url,
			data: params,
			responseType: 'arraybuffer',
		})
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err.msg)
			})
	})
}
