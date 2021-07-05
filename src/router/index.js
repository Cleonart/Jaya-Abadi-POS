import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../ui/Main.vue'

// pengaturan
import TabelSatuan from '../views/pengaturan/satuan/tabel.vue'
import FormSatuan from '../views/pengaturan/satuan/form.vue'
import TabelKategori from '../views/pengaturan/kategori/tabel.vue'
import FormKategori from '../views/pengaturan/kategori/form.vue'
import TabelMerek from '../views/pengaturan/merek/tabel.vue'
import FormMerek from '../views/pengaturan/merek/form.vue'


import Login from "@/ui/Login.vue"

import MasterRoute from "@/master"
import OrderRoute from "@/order"

const routes = [ 
  {
    path : "/",
    component : Main,
    children : [
      MasterRoute.router,
      OrderRoute.router
    ]
  },
  {
    path : "/login",
    name : "Login",
    component : Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
