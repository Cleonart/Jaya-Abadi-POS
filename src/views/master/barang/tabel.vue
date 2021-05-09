<template>	
	<div class="bg-gray-50 h-full">
		<loading :active="loadingActive"/>
		<Header title="Daftar Barang" subtitle="Kelola daftar barang disini" @refresh="getDataTable()"/>
		<div class="rounded-md shadow mx-10 relative bg-white">
			<div class="flex px-5 pt-4 pb-4">
				<SearchBar class="w-full md:w-4/5" :value="search_bar" @input="search_bar = $event.target.value"/>
				<div class="w-full md:w-1/5 mt-2 font-semibold relative">
					<div @click="goToAddOrEdit()" class="m-1 w-full md:w-full bg-green-600 py-2 px-5 pointer rounded-md text-sm hover:opacity-80 transition text-white font-semibold">
						<p class="w-full text-center mt-0.5">+ Tambah Barang</p>
					</div>
				</div>
			</div>
			<Tables :table_head="table_head" :table_body="filteredData">
				<template v-slot:default="props">
					<div class="flex">
						<a :href="'/#/master/barang/' + props.actionProps[0].text">
							<svg class="py-2 px-2 bg-green-100 text-green-700 mr-2 pointer rounded-md w-8 hover:bg-gray-800 hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
						</a>
					</div>
				</template>
			</Tables>
		</div>
	</div>
</template>

<script>

	const axios = require('axios');
	import Tables from '../../../components/table.vue';
	import Loading from 'vue-loading-overlay';
	import Header from '@/modules/master/header.vue';
	import SearchBar from '@/modules/master/searchbar.vue';
	import {DEFAULT_ENDPOINT} from '../../../functions/universal.js';

	export default{
		data(){
			return{
				// internal control
				search_bar : "",
				table_body : [],
				loadingActive : true,

				// changeable
				table_head : ["KODE", "KATEGORI", "NAMA", "MERK", "VARIAN", "HARGA", "STOK TOKO", "STOK GUDANG", "AKSI"],
				defaultUrl : ""
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
				app.defaultUrl = DEFAULT_ENDPOINT + "/master/barang/tabel";
				axios.get(app.defaultUrl)
					 .then(response => {
					 	app.table_body = response.data;
					 	app.loadingActive = false;
					 })
					 .catch(response => {
					 	alert("Terjadi masalah dengan jaringan anda :(");
					 	app.loadingActive = false;
					 })
			}
		},

		created(){
			this.getDataTable();
		},
		
		components : { Header, Tables, SearchBar, Loading }
	}
</script>