const routes = [
  {path: '/admin', component: () => import('pages/admin/login.vue')},
  {
    path: '/admin',
    component: () => import('layouts/MainLayoutAdmin.vue'),
    children: [
      // {path: 'dashboard', component: () => import('pages/admin/dashboard.vue')},
      // {path: 'dashboard_v2', component: () => import('pages/admin/dashboard_v2.vue')},
      // {path: 'dashboard_v3', component: () => import('pages/admin/dashboard_v3.vue')},
      // {path: 'customer_management', component: () => import('pages/admin/customer_management.vue')},
      // {path: 'change_request', component: () => import('pages/admin/change_request.vue')},
      // {path: 'my_profile', component: () => import('pages/admin/my_profile.vue')},
      // {path: 'sales_invoices', component: () => import('pages/admin/sales_invoices.vue')},
      // {path: 'quotes', component: () => import('pages/admin/quotes.vue')},
      // {path: 'transactions', component: () => import('pages/admin/transactions.vue')},
      // {path: 'employee_salary_list', component: () => import('pages/admin/employee_salary_list.vue')},
      // {path: 'calendar', component: () => import('pages/admin/calendar.vue')},
      // {path: 'department', component: () => import('pages/admin/department.vue')}
    ]
  },
  { path: '/register', component: () => import('pages/register.vue')},
  { path: '/login', component: () => import('pages/login.vue'), name : 'login' , meta: { auth : false}},
  {
    path: '', component: () => import('layouts/UserHeader'),
    children: [
      {path: '/history', component: () => import('pages/TestHistory')},
      {path: '/ielts-test', component: () => import('pages/IeltsTest')},
      { path: '/home', component: () => import('pages/home') , meta: { auth : true}}
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
