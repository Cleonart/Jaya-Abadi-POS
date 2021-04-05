<template>	
	<div>
		<div class="relative flex">
			<div class="w-full md:w-1/2">
				<p class="font-bold text-3xl mt-6 mb-1">Daftar Pengguna</p>
				<p class="mb-7 text-gray-600">Kelola daftar pengguna disini</p>
			</div>	
		</div>

		<div class="rounded-md shadow">
			<div class="flex px-5 pt-4 pb-4">
				<div class="w-full md:w-4/5">
					<input type="text" v-model="search_bar" class="text-sm border rounded-full pl-4 w-full md:w-56 py-2" placeholder="Cari Nama Pengguna Disini">
				</div>
				<div class="w-full md:w-1/5 relative flex">
					<div @click="goToAddOrEdit()" class="m-1 w-full md:w-full bg-green-600 py-2 px-5 pointer rounded-full text-sm hover:opacity-80 transition text-white font-semibold">
						<p class="w-full text-center mt-0.5">+ Tambah Pengguna</p>
					</div>
				</div>
			</div>
			<Tables :table_head="table_head" :table_body="filteredData"></Tables>
		</div>
	</div>
</template>

<script>

	const axios = require('axios');
	import Tables from '../../../components/table.vue';
	import {DEFAULT_ENDPOINT} from '../../../functions/universal.js';

	export default{
		data(){
			return{
				search_bar : "",
				table_head : ["ID", "NAMA PENGGUNA", "POSISI", "STATUS"],
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
				this.$router.replace("/master/pengguna/baru");
			},

			getDataTable : function() {
				var app = this;
				app.table_body = [];
				axios.get(DEFAULT_ENDPOINT + "/master/pengguna/tabel")
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