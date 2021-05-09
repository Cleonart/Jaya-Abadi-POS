<template>	
	<div class="px-10">
		<loading :active="loadingActive"/>
		<Header title="Daftar Barang" subtitle="Kelola daftar barang disini"/>
		<section class="rounded-md shadow">
			<div class="flex px-5 pt-4 pb-4">
				<div class="w-full md:w-4/5">
					<input type="text" v-model="search_bar" class="text-sm border rounded-full pl-4 w-full md:w-56 py-2" placeholder="Cari Barang Disini">
				</div>
				<div class="w-full md:w-1/5 relative flex">
					<div @click="goToAddOrEdit()" class="m-1 w-full md:w-full bg-green-600 py-2 px-5 pointer rounded-full text-sm hover:opacity-80 transition text-white font-semibold">
						<p class="w-full text-center mt-0.5">+ Tambah Barang</p>
					</div>
				</div>
			</div>
			<Tables :table_head="table_head" :table_body="filteredData">
				<div class="flex">
					<a href="/#/master/barang/">
						<svg class="py-2 px-2 bg-green-100 text-green-700 mr-2 pointer rounded-md w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
					</a>
				</div>
			</Tables>
		</section>
	</div>
</template>

<script>

	const axios = require('axios');
	import Tables from '../../../components/table.vue';
	import Loading from 'vue-loading-overlay';
	import Header from '@/modules/master/header.vue';
	import {DEFAULT_ENDPOINT} from '../../../functions/universal.js';

	export default{
		data(){
			return{
				search_bar : "",
				table_head : ["KODE", "KATEGORI", "NAMA", "MERK", "VARIAN", "HARGA", "STOK TOKO", "STOK GUDANG", "AKSI"],
				table_body : [],
				loadingActive : true,
			}
		},
		computed : {

			filteredData(){
				return this.table_body.filter(tableData => {
					return tableData[2].text.toLowerCase().includes(this.search_bar.toLowerCase());
				});
			}
			
		},
		methods : {

			goToAddOrEdit : function() {
				this.$router.replace("/master/barang/baru");
			},

			getDataTable : function() {
				var app = this;
				app.loadingActive = true;
				axios.get(DEFAULT_ENDPOINT + "/master/barang/tabel")
					 .then(response => {
					 	console.log(response);
					 	app.table_body = response.data;
					 	app.loadingActive = false;
					 })
					 .catch(response => {
					 	app.loadingActive = false;
					 	alert("Terjadi masalah dengan jaringan anda :(");
					 })
			}
		},

		created(){
			this.getDataTable();
		},
		
		components : { Header, Tables, Loading }
	}
</script>