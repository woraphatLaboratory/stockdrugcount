import axios from "axios";
import {defineStore} from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        // user: JSON.parse(localStorage.getItem("user")),
        // token: JSON.parse(localStorage.getItem("token")),
        // statusToken :[],
    }),
    getters: {

        // isLoggedIn: (state) => state.user,
    },
    actions: {
        async login(username, password) {
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อยืนยันตัวตน
            try {
                const response = (await axios.post('https://468b-1-46-214-37.ngrok-free.app/drug/user/login', {
                // const response = (await axios.post('http://127.0.0.1:8585/drug/user/login', {
                    userName: username,
                    passWord:password
                })).data
                // console.log(response)
                // return response.status !== 401;
                if (response.status === 401){
                    this.isAuthenticated = false;
                    return false
                }else{
                    this.isAuthenticated = true;
                    return true
                }
            } catch (error) {
                // ไม่สำเร็จ
                console.error('Login failed:', error);
            }
        },
        async logout() {
            // เคลียร์ข้อมูลใน localStorage
            localStorage.removeItem('user');
            // กำหนดค่าให้กับ state
            this.isAuthenticated = false;
            this.user = null;
        },
    },
});


