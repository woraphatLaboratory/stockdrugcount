import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/useAuth.js";
import loginPageView from "@/views/LoginPageView.vue";
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginPageView.vue')
    } ,{
      path: '/homePage',
      name: 'Home',
      component: () => import('../views/homepage.vue')
    }
    ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // เรียกใช้งาน store ของการยืนยันตัวตน
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // ถ้าหน้านี้ต้องการการยืนยันตัวตนแต่ผู้ใช้ยังไม่ได้เข้าสู่ระบบ
    next('/');
  } else {
    next(); // ให้ผู้ใช้เข้าสู่หน้าตามปกติ
  }
});
export default router
