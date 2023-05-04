import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { title: '404' },
    hidden: true
  },
  // 仪表盘
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 个人中心
  {
    path: '/profile',
    component: Layout,
    children: [{
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '个人中心', icon: 'profile' }
    }],
    hidden: true
  },
  // 文章
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/list',
    name: 'Blog',
    meta: { title: '文章', icon: 'el-icon-document' },
    children: [
      {
        path: 'list',
        name: 'BlogList',
        component: () => import('@/views/blog/blog-list'),
        meta: { title: '所有文章', icon: 'el-icon-s-order' }
      },
      {
        path: 'write',
        name: 'WriteBlog',
        component: () => import('@/views/blog/write-blog'),
        meta: { title: '写文章', icon: 'write' }
      },
      {
        path: 'category',
        name: 'BlogCategory',
        component: () => import('@/views/category/index'),
        meta: { title: '分类', icon: 'category' }
      },
      {
        path: 'tag',
        name: 'BlogTag',
        component: () => import('@/views/tag/index'),
        meta: { title: '标签', icon: 'tag' }
      }
    ]
  },
  // 附件
  {
    path: '/attachment',
    component: Layout,
    children: [{
      path: '/attachment',
      name: 'Attachment',
      component: () => import('@/views/attachment/index'),
      meta: { title: '附件', icon: 'attachment' }
    }]
  },
  // 评论
  {
    path: '/comment',
    component: Layout,
    children: [{
      path: '/comment',
      name: 'Comment',
      component: () => import('@/views/comment/index'),
      meta: { title: '评论', icon: 'comment' }
    }]
  },
  // 友链
  {
    path: '/link',
    component: Layout,
    children: [{
      path: '/link',
      name: 'Link',
      component: () => import('@/views/link/index'),
      meta: { title: '友链', icon: 'link' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
