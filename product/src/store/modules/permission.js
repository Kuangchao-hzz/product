import { asyncRouterMap, includeRouterMap } from '../../router'
const asyncRouterMapJSON = JSON.stringify(asyncRouterMap)

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles {array} 返回的用户权限
 * @param route {object} 路由对象
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => {
      if (route.meta.role.indexOf('$admin') !== -1) {
        return true
      }
      return route.meta.role.indexOf(role) >= 0
    })
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap {array} 需要处理的权限路由
 * @param roles {array} 返回的用户权限
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

const permission = {
  state: {
    routers: includeRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS (state, routers) {
      state.addRouters = deepClone(routers)
      state.routers = deepClone(includeRouterMap.concat(routers))
    },
    RESET_ROUTERS (state) {
      state.addRouters = []
      state.routers = includeRouterMap
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.some((role) => role === 'admin')) {
          accessedRouters = JSON.parse(asyncRouterMapJSON)
        } else {
          accessedRouters = filterAsyncRouter(JSON.parse(asyncRouterMapJSON), roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    },
    ResetCurrentRouter ({ commit }) {
      commit('RESET_ROUTERS')
    }
  }
}
export default permission
