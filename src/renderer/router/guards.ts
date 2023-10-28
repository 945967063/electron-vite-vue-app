import { Router } from 'vue-router'

// 白名单(不需要登录检测)
const whiteList = ['/', '/forgetPassword', '/teamInvite', '/privacyPolicy']

export function CreateRouterGuards(router: Router) {
  router.beforeEach(async (to) => {
    // console.log(to);

    if (!whiteList.includes(to.path)) {
      // 如果没有登录 跳转到登录页页面
      // if (!tokens?.token) {
      //   router.push({
      //     path: '/'
      //   })
      //   return
      // }
    }
    // 如果路由没有初始化 则初始化路由
    // if (routers.router.length === 0) {
    //   const list = await routers.getAsyncRouter()
    //   list.forEach((item: RouteRecordRaw) => {
    //     router.addRoute(item)
    //   })
    //   return to.fullPath
    // }
    return
  })
  router.onError((error) => {
    console.log(error)
  })
  router.afterEach(() => {})
}
