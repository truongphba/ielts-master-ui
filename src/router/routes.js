const routes = [
  {path: '/admin', component: () => import('pages/admin/login.vue')},
  {
    path: '/admin',
    component: () => import('layouts/MainLayoutAdmin.vue'),
    children: [
      {path: 'dashboard', component: () => import('pages/admin/dashboard.vue')},
      {path: 'user-wallet', component: () => import('pages/admin/user_wallet')},
      {path: 'user-management', component: () => import('pages/admin/user_management.vue')},
      {path: 'listening-management', component: () => import('pages/admin/listen_management.vue')},
      {path: 'reading-management', component: () => import('pages/admin/read_management')},
      {path: 'writing-management', component: () => import('pages/admin/write_management')},
    ]
  },
  {path: '/register', component: () => import('pages/register.vue')},
  {path: '/login', component: () => import('pages/login.vue'), name: 'login', meta: {auth: false}},
  {
    path: '/home', component: () => import('layouts/MainLayout'),
    children: [
      {path: '/ielts-test', component: () => import('pages/IeltsTest')},
      {path: '/history', component: () => import('pages/TestHistory')},
      {path: '/lecturer-history', component: () => import('pages/LecturerTestHistory')},
      {path: '/home', component: () => import('pages/home')},
      {path: '/speaking-exam', component: () => import('pages/speaking-exam')},
      {path: '/reading-test', component: () => import('pages/ReadingTest')},
      {path: '/listening-test', component: () => import('pages/ListeningTest')},
      {path: '/writing-test', component: () => import('pages/WritingTest')},
      {path: '/lecture-exam', component: () => import('pages/lecture-exam')},
      {path: '/addfund', component: () => import('pages/Addfund')},
      {path: '/about-us', component: () => import('pages/about_us')},
    ]
  },

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
