<template>	
	<div class="bg-gray-50 h-full">
		<loading :active="loadingActive"/>
		<Header title="Daftar Supplier" subtitle="Kelola daftar supplier disini" @refresh="getDataTable()"/>
		<div class="rounded-md shadow mx-10 relative bg-white">
			<div class="flex px-5 pt-4 pb-4">
				<SearchBar class="w-full md:w-4/5" :value="search_bar" placeholder="Cth. Jaya Abadi" @input="search_bar = $event.target.value"/>
				<div class="w-full md:w-1/5 mt-2 font-semibold relative">
					<p @click="directForm()"  class="green-button right-0 md:absolute"><Truck class="mr-2 -mt-1"/>Tambah Supplier</p>
				</div>
			</div>
			<Tables :table_head="table_head" :table_body="filteredData">
				<template v-slot:default="props">
					<div class="flex my-1">
						<a :href="'/#/master/supplier/' + props.actionProps[0].text">
							<span class="px-2 py-2 bg-green-100 text-green-700 mr-2 pointer rounded-md hover:bg-gray-800 hover:text-white transition">
								<Pencil/>
							</span>
						</a>
					</div>
				</template>
			</Tables>
		</div>
	</div>
</template>

<script>

	const axios = require('axios');

	// modules
	import Header from '@/modules/master/header.vue';
	import SearchBar from '@/modules/master/searchbar.vue';
	
	// components
	import Tables from '@/components/table.vue';
	import Loading from 'vue-loading-overlay';
	import Truck from '@/assets/icons/truck.vue';
	import Pencil from '@/assets/icons/pencil.vue';

	// api
	import {DEFAULT_ENDPOINT} from '../../../functions/universal.js';

	export default{
		data(){
			return{
				// internal control
				search_bar : "",
				table_body : [],
				loadingActive : true,

				table_head : ["ID", "NAMA SUPPLIER", "ALAMAT", "PROVINSI/KOTA","KONTAK", "AKSI"],
				defaultUrl : "",
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

			directForm : function() {
				this.$router.replace("/master/supplier/baru");
			},

			getDataTable : function() {
				var app = this;
				app.loadingActive = true;
				app.defaultUrl = DEFAULT_ENDPOINT + "/master/supplier/tabel";
				axios.get(app.defaultUrl)
					 .then(response => {
					 	app.table_body = response.data;
					 	setTimeout(function(){app.loadingActive = false}, 500);
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
		
		components : { Header, Tables, SearchBar, Loading, Truck, Pencil }
	}
</script>