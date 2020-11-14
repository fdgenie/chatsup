
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LobbyPage.vue'),  meta: { auth: true } },
      { path: '/chat/:otherUserId', component: () => import('pages/ChatPage.vue'),  meta: { auth: true } },
      { path: '/login', component: () => import('pages/LoginPage.vue'),  meta: { auth: false } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
