import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/Home.vue'
import Home from '../views/Home.vue'

// master
import TabelBarang from '../views/master/barang/tabel.vue'
import FormBarang from '../views/master/barang/form.vue'

import Form from '../components/form.vue'

// penjualan
import POS from '../views/penjualan/pos/index.vue'

// pengaturan
import TabelSatuan from '../views/pengaturan/satuan/tabel.vue'
import FormSatuan from '../views/pengaturan/satuan/form.vue'
import TabelKategori from '../views/pengaturan/kategori/tabel.vue'
import FormKategori from '../views/pengaturan/kategori/form.vue'
import TabelMerek from '../views/pengaturan/merek/tabel.vue'
import FormMerek from '../views/pengaturan/merek/form.vue'


const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Home
  },
  {
    path: '/master/barang/:id',
    name: "Mutasi Barang",
    component : FormBarang
  },
  {
    path: '/master/barang',
    name: "Barang",
    component : TabelBarang
  },
  
  {
    path: '/penjualan/pos',
    name: "Point of Sales",
    component : POS
  },

  /* Pengaturan Satuan */
  {
    path: '/pengaturan/satuan/:id',
    name: "Mutasi Pengaturan",
    component : FormSatuan
  },
  {
    path: '/pengaturan/satuan',
    name: "Pengaturan",
    component : TabelSatuan
  },

  /* Pengaturan Kategori */
  {
    path: '/pengaturan/kategori/:id',
    name: "Mutasi Kategori",
    component : FormKategori
  },
  {
    path: '/pengaturan/kategori',
    name: "Kategori",
    component : TabelKategori
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
