<template>	
	<div class="bg-gray-50 h-full">
		<loading :active="loadingActive"/>
		<Header title="Daftar Barang" subtitle="Kelola daftar barang disini" @refresh="getDataTable()"/>
		
		<div class="rounded-md shadow mx-10 relative bg-white">
			<div class="flex px-5 pt-4 pb-4 relative">
				<SearchBar class="w-full md:w-4/5" :value="search_bar" placeholder="Cth. Paku" @input="search_bar = $event.target.value"/>
				<div class="absolute right-10 top-1/2 -translate-y-2/4 transform mt-1">
					<p @click="directForm()" class="green-button"><Plus class="mr-2 -mt-1"/>Tambah Barang</p>
					<p @click="directForm()" class="green-glow-button ml-2"><CloudUpload class="mr-2 -mt-1"/>Import CSV</p>
				</div>
			</div>
			<Tables :table_head="table_head" :table_body="filteredData">
				<template v-slot:default="props">
					<div class="flex">
						<a :href="'/#/master/barang/' + props.actionProps[0].text">
							<svg class="py-2 px-2 bg-green-100 text-green-700 mr-2 pointer rounded-md w-8 hover:bg-gray-800 hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
						</a>
						<p @click="deleteItem(props.actionProps[0].text)" class="py-1 px-2 bg-red-100 text-red-700 mr-2 pointer rounded-md w-8 hover:bg-gray-800 hover:text-white transition">
							<Trash/>
						</p>
					</div>
				</template>
			</Tables>
		</div>
	</div>
</template>

<script>

	const axios = require('axios');
	const sweet = require('sweetalert2');

	// Modules
	import Header from '../components/header.vue';
	import SearchBar from '../components/searchbar.vue';
	
	// Components
	import Tables from '@/components/table.vue';
	import Loading from 'vue-loading-overlay';
	import Plus from '@/assets/icons/plus.vue';
	import CloudUpload from '@/assets/icons/cloudUpload.vue';
	import Trash from '@/assets/icons/trash.vue'

	// API's
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';

	export default{
		data(){
			return{
				// internal control
				search_bar : "",
				table_body : [],
				loadingActive : true,
				masterTable : "barang",

				// changeable
				table_head : ["KODE", "KATEGORI", "NAMA", "HARGA", "STOK TOKO / GUDANG", "AKSI"],
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

			directForm : function() {
				var app = this;
				this.$router.replace("/master/" + app.masterTable + "/baru");
			},

			getDataTable : function() {
				var app = this;
				app.loadingActive = true;
				app.defaultUrl = DEFAULT_ENDPOINT + "/master/" + app.masterTable + "/table";
				axios.get(app.defaultUrl)
					 .then(response => {
					 	app.table_body = response.data;
					 	setTimeout(function(){app.loadingActive = false}, 500);
					 })
					 .catch(response => {
					 	alert("Terjadi masalah dengan jaringan anda :(");
					 	app.loadingActive = false;
					 })
			},

			deleteItem : function(id){
				const app = this;
				sweet.fire({
					title: 'Anda yakin?',
					text: "Apakah anda yakin ingin mengarsipkan data ini?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#2ecc71',
					cancelButtonColor: '#e74c3c',
					confirmButtonText: 'Ya, Tambahkan'
				}).then((result) => {
					if(result.isConfirmed){
						app.loadingActive = true;
						axios.delete(DEFAULT_ENDPOINT + "/master/" + app.masterTable + "/id/" + id)
						.then(response => {
							sweet.fire(
								'Proses Berhasil',
								'Data berhasil diarsipkan',
								'success'
							);
							app.loadingActive = false;
						})
					}
				})	
			}
		},

		created(){
			this.getDataTable();
		},
		
		components : { Header, Tables, SearchBar, Loading, Plus, CloudUpload, Trash}
	}
</script>