import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/Home.vue'
import Home from '../views/Home.vue'

// master
import TabelBarang from '../views/master/barang/tabel.vue'
import FormBarang from '../views/master/barang/form.vue'

import TabelPengguna from '../views/master/pengguna/tabel.vue'
import FormPengguna from '../views/master/pengguna/form.vue'

import TabelSupplier from '../views/master/supplier/tabel.vue'
import FormSupplier from '../views/master/supplier/form.vue'

import TabelPelanggan from '../views/master/pelanggan/tabel.vue'
import FormPelanggan from '../views/master/pelanggan/form.vue'

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

  /* Master Barang */
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

  /* Master Supplier */
  {
    path: '/master/supplier/:id',
    name: "Mutasi Supplier",
    component : FormSupplier
  },
  {
    path: '/master/supplier',
    name: "Supplier",
    component : TabelSupplier
  },

  /* Master Pelanggan */
  {
    path: '/master/pelanggan/:id',
    name: "Mutasi Pelanggan",
    component : FormPelanggan
  },
  {
    path: '/master/pelanggan',
    name: "Pelanggan",
    component : TabelPelanggan
  },

  /* Master Pengguna */
  {
    path: '/master/pengguna/:id',
    name: "Mutasi Pengguna",
    component : FormPengguna
  },
  {
    path: '/master/pengguna',
    name: "Penggguna",
    component : TabelPengguna
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

  /* Pengaturan Merek */
  {
    path: '/pengaturan/merek/:id',
    name: "Mutasi Merek",
    component : FormMerek
  },
  {
    path: '/pengaturan/merek',
    name: "Merek",
    component : TabelMerek
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
