<template>
  <div class="h-full w-full">
    <div class="p-5 sticky top-0 bg-white z-50">
      <span class="p-2 pb-5 text-l font-sans">ระบบนับคลังยา</span>
      <input type="text" v-model="searchText" id="search-input"
             class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>

      <div class="flex justify-center pl-5 pr-5 pb-2" v-for="(drug, index) in paginatedDrugs" :key="index">
        <a  @click="showAlert(drug.id,drug.nameDrug,drug.stock)" class="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div class="flex flex-wrap">
            <div class="w-full">
              <span class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                  drug.nameDrug
                }}</span>
            </div>
            <div class="w-full"><span class="font-normal text-gray-700 dark:text-gray-400">โดส : {{ drug.dose }}  {{
                drug.doseType
              }}</span>
            </div>
            <div class="w-full"><span class="font-normal text-gray-700 dark:text-gray-400">คงเหลือ : {{
                drug.stock
              }}</span></div>
          </div>
        </a>
      </div>

    <div class="flex justify-center items-center sticky bottom-0 z-50 bg-white shadow-2xl">
      <button @click="previousPage" :disabled="currentPage === 1"
              class="px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
        ย้อนกลับ
      </button>
      <span class="border-2 text-xl font-bold m-5 pr-3 pl-3">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
              class="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-700 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
        ถัดไป
      </button>
    </div>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
// import router from "@/router/index.js";

export default {
  components:{
    Swal
  },
  setup() {
    const drugs = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 6;
    const searchText = ref('');

    onMounted(async () => {
      const response = await axios.post('https://468b-1-46-214-37.ngrok-free.app/drug/drug/getDrug');
      // const response = await axios.post('http://localhost:8585/drug/drug/getDrug');
      drugs.value = response.data;
    });

    const totalPages = computed(() => Math.ceil(drugs.value.length / itemsPerPage));

    const paginatedDrugs = computed(() => {
      const filteredDrugs = drugs.value.filter(drug =>
          drug.nameDrug.toLowerCase().includes(searchText.value.toLowerCase())
      );
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = currentPage.value * itemsPerPage;
      return filteredDrugs.slice(startIndex, endIndex);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const showAlert = (id,name,stocks) => {
      Swal.fire({
        titleText: `${name}`,
        text: `แก้ไขจำนวนยา คงเหลือ: ${stocks}`,
        fontSize: '8px',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          inputmode: 'numeric',
          pattern: '[0-9]*',
        },
        allowHtmlTags: true,
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        confirmButtonColor: '#0E9F6E',
        showLoaderOnConfirm: true,
        preConfirm: async (stock) => {
          if (!stock) {
            Swal.showValidationMessage('กรุณากรอกจำนวนที่ต้องปรับ');
          } else {
            if (!isNaN(parseInt(stock))) {
                  // return await axios.post('http://localhost:8585/drug/drug/updateStock',{id:id,stock:stock})
                  return await axios.post('https://468b-1-46-214-37.ngrok-free.app/drug/drug/updateStock',{id:id,stock:stock})
            } else {
              Swal.showValidationMessage('กรุณากรอกตัวเลขเท่านั้น');
            }

          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(async (result) => {
        if (result.isConfirmed) {
         // หลังจากอัพเดตเสร็จฉันตจ้องการให้ location reload

          window.location.reload();
        }
      })

    }

    return {
      drugs,
      currentPage,
      totalPages,
      paginatedDrugs,
      nextPage,
      previousPage,
      searchText,
      showAlert
    };
  }
};
</script>
