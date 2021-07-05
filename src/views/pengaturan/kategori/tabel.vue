<template>	
	<div>
		<div class="relative flex">
			<div class="w-full md:w-1/2">
				<p class="font-bold text-3xl mt-6 mb-1">Pengaturan Kategori</p>
				<p class="mb-7 text-gray-600">Atur Jenis-jenis kategori disini</p>
			</div>	
		</div>

		<div class="rounded-md shadow">
			<div class="flex px-5 pt-4 pb-4">
				<div class="w-full md:w-4/5">
					<input type="text" v-model="search_bar" class="text-sm border rounded-full pl-4 w-full md:w-56 py-2" placeholder="Cari Satuan Disini">
				</div>
				<div class="w-full md:w-1/5 relative flex">
					<div @click="goToAddOrEdit()" class="m-1 w-full md:w-full bg-green-600 py-2 px-5 pointer rounded-full text-sm hover:opacity-80 transition text-white font-semibold">
						<p class="w-full text-center mt-0.5">+ Tambah Kategori</p>
					</div>
				</div>
			</div>
			<Tables :table_head="table_head" :table_body="filteredData"></Tables>
		</div>
	</div>
</template>

<script>

	const axios = require('axios');
	import Tables from '@/components/table.vue';
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';

	export default{
		data(){
			return{
				search_bar : "",
				table_head : ["KODE", "NAMA KATEGORI", "AKSI"],
				table_body : [],
			}
		},
		computed : {

			filteredData(){
				return this.table_body.filter(tableData => {
					return tableData[1].text.toLowerCase().includes(this.search_bar.toLowerCase());
				});
			}
			
		},
		methods : {

			goToAddOrEdit : function() {
				this.$router.replace("/pengaturan/kategori/baru");
			},

			getDataTable : function() {
				var app = this;
				axios.get(DEFAULT_ENDPOINT + "/pengaturan/kategori/tabel")
					 .then(response => {
					 	console.log(response);
					 	app.table_body = response.data;
					 })
			}
		},

		created(){
			this.getDataTable();
		},
		
		components : { Tables }
	}
</script>