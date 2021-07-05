<template>
	<div class="w-full md:flex">

		<Modal ref="modal">
			<template v-slot:content>
				<p class="text-2xl mt-2 font-bold">Detail Barang</p>
				<hr class="my-3" />
				<p class="text-lg">{{barang.barang_nama}}</p>
				<p class="text-gray-500">{{barang.barang_varian}}</p>
				<Text :value="barang.barang_harga_jual"
					  @input="barang.barang_harga_jual = $event.target.value"
					  label="Ubah Harga"
					  required="true"
					  class="mt-3"  
					  footnote="Harga barang dapat berubah sewaktu-waktu"
					  placeholder="Ex.3"/>
			</template>
			<template v-slot:button>
				<button @click="add_item(barang)" class="green-glow-button text-sm ml-1">Tambah</button>
			</template>
		</Modal>
	
		<div class="w-full md:w-7/12 px-10">
			<p class="font-bold text-3xl mt-6">Daftar Barang</p>
			<p class="text-sm text-gray-400 mt-1.5">Barang yang dipilih akan dimasukan ke dalam order</p>

			<!-- Search Bar -->
			<div class="flex relative mt-6">
				<svg class="w-6 mr-3 top-1 mt-0.2 text-gray-400 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				<input type="text" class="bg-transparent w-full text-2xl pb-2.5 pl-9 mb-3 transition border-b focus:border-green-300" v-model="search_bar" placeholder="Cari kode, barang atau varian disini.." name="">
			</div>

			<div class="flex">
				<span class="mr-2 px-4 py-1 rounded-full border font-semibold text-sm hover:bg-green-300 transition pointer hover:-translate-y-0.5 transform" v-for="(item,index) in category"  @click="changeCategory(index)"  :class="{'bg-green-200' : item.active, 'text-green-600' : item.active}">{{item.name}}</span>
			</div>

			<!-- Products -->
			<div class="grid grid-cols-3 gap-3 mt-5">	
				<posProductCard v-for="(item, index) in filter_barang" :item="item" @click="openModal(index)"/>
			</div>
			<p 	class="w-full text-red-500 bg-red-50 px-4 py-2 rounded font-semibold" 
				v-if="filter_barang.length == 0">Tidak ada barang ditemukan :(</p>
		</div>
		<posOrder class="w-full md:w-4/12" :order="order" :data_barang="data_barang"/>
	</div>
</template>

<script type="text/javascript">

	import Barang from '@/master/model/Barang.js';
	import Order from '../models/Order.js';
	import posOrder from '../components/posOrder.vue';
	import posProductCard from '../components/posProductCard.vue';
	import Modal from '@/components/modal.vue';
	import Text from '@/components/form_component/text.vue'

	// API's
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';
	const axios = require("axios");

	export default{
		data(){
			return{
				barang : new Barang(),
				order : new Order(),
				data_barang : [],
				category : [
					{
						name : "Semua",
						active : true
					}
				],
				order_list : [],
				search_bar : "",
				selected_barang_index : false,
			}
		},
		components:{
			posOrder, posProductCard, Modal, Text
		},
		computed : {
			filter_barang(){
				return this.data_barang.filter(barang => {
					let barang_nama = barang.barang_nama.toLowerCase();
					let barang_id = barang.barang_id.toLowerCase();
					let barang_varian = barang.barang_varian.toLowerCase();
					if(barang_nama.includes(this.search_bar.toLowerCase())){
						return barang_nama;
					}
					else if(barang_id.includes(this.search_bar.toLowerCase())){
						return barang_nama;
					}
					else if(barang_varian.includes(this.search_bar.toLowerCase())){
						return barang_nama;
					}
				})
			}
		},
		methods : {
			
			changeCategory : function(index){
				this.category[index].active = true;
				for(var i = 0; i < this.category.length; i++){
					if(i != index){
						this.category[i].active = false;
					}
				}
			},

			add_item(item){
				let barang = new Barang();
				let item_exist = false;
				barang.barang_id = item.barang_id;
				barang.barang_satuan = item.barang_satuan_eceran;
				barang.barang_jumlah = 1;
				barang.barang_harga = item.barang_harga_jual;
				barang.barang_total = item.barang_harga_jual * 1;

				this.order.order_item.forEach((item,index) => {
					if(item.barang_id == barang.barang_id){
						let total = parseInt(item.barang_jumlah) + barang.barang_jumlah;
						this.order.order_item[index].barang_harga = barang.barang_harga;
						this.order.order_item[index].barang_jumlah = total;
						item_exist = true;
					}
				})
				!item_exist && this.order.order_item.push(barang);
				this.$refs.modal.closeModal();
			},

			get(){
				var app = this;
				let ENDPOINT = DEFAULT_ENDPOINT + "/order/pos/form/baru";
				console.log(ENDPOINT);
				axios.get(ENDPOINT)
					.then(response => {
						app.order = response.data.order;
						app.data_barang = response.data.data_barang;
						app.order.order_pelanggan_id = "PELGENERAL";
						app.order.order_sales_id = "USR96941";
						app.order.order_posisi_stok = "toko";

						var today = new Date();
						var dd = String(today.getDate()).padStart(2, '0');
						var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
						var yyyy = today.getFullYear();

						let date = mm + "/" + dd + "/" + yyyy;
						app.order.order_tanggal = date;
					})
					.catch(error => {

					})
			},

			openModal(index){
				this.$refs.modal.openModal();
				this.barang = this.data_barang[index];
			}
		},
		created(){
			this.get();
		}
	}
</script>

<style>
	
</style>