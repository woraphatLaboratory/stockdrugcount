<template>
  <div class="h-screen flex justify-center items-center">
    <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" @submit.prevent="login" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">เข้าสู่ระบบ</h5>
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ผู้ใช้งาน</label>
          <input
              v-model="formData.username"
              type="text"
              name="username"
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="รหัสผู้ใช้งาน"
              required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
          <input
              v-model="formData.password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref  } from 'vue';
import { useRouter } from 'vue-router';
import  { useAuthStore }  from '../stores/useAuth'; // เรียกใช้ useAuthStore จากไฟล์ที่เก็บสถานะการยืนยันตัวตน

export default {
  setup() {
    const router = useRouter();
    const formData = ref({
      username: '',
      password: ''
    });

    const authStore = useAuthStore(); // สร้าง instance ของ useAuthStore

    const login = async () => {
      // console.log(formData.value.username)
      try {
        // เรียกใช้เมธอด login จาก useAuthStore เพื่อทำการเข้าสู่ระบบ
      const data =  await authStore.login(formData.value.username, formData.value.password);
        console.log(data)
        if(data){
          router.push('/homePage')
        }else {
          alert('รหัสผ่านหรือชื่อผู้ใช้งานผิด')
        }

        // console.log('Logged in successfully!');
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return {
      formData,
      login
    };
  }
};
</script>
