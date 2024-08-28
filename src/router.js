import { createWebHistory, createRouter } from 'vue-router'

import PostListPage from './pages/PostListPage.vue'
import PostPage from './pages/PostPage.vue'

const routes = [
  { path: '/', component: PostListPage },
  { path: '/user/:userId', component: PostListPage, props: true },
  { path: '/post/:postId', component: PostPage, props: true },
]

export default createRouter({
  history: createWebHistory('/indins-test-task/'),
  routes,
})
