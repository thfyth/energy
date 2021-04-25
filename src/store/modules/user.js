import { login, logout,getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userId:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password,grantType } = userInfo

    return new Promise((resolve, reject) => {
      login({ userName:username, password,grantType }).then(response => {
        const { data } = response
        const { refresh_token,token,username,userId } = data;
        commit('SET_TOKEN', token)
        commit('SET_NAME', username)
        commit('SET_USERID',userId);
        //保存用户ID和姓名到本地存储
        localStorage.setItem('userId',userId);
        localStorage.setItem('username',username);
        setToken(token)
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data);
        //设置权限
        const menuList = getFirst(data)
        commit('SET_ROLES', getRoleId(data))
        commit('SET_NAME', localStorage.getItem('username'))
        commit('SET_USERID', localStorage.getItem('userId'));
        // commit('SET_MENU_LIST', getFirst(data))
        //设置名字
        //设置头像
        // commit('SET_AVATAR', avatar)
        resolve(menuList)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        localStorage.clear();
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
function getFirst(obj) {		//obj为我们的对象
  for (var key in obj) {
    return obj[key];
  }
}

function getRoleId(obj) {		//obj为我们的对象
  let str = '';
  for (var key in obj) {
    str += key+",";
  }
  return str;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

