<template>
	<div>
		<formHeader title="Buat Penjualan Baru" 
					subtitle="Order penjualan baru akan dicatat disini"
					:total="formatRupiah(order.order_total)"/>

		<section class="grid grid-cols-3 gap-8 mt-5 px-10 mt-8" v-show="order">

			<div class="col-1">
				<Select :value="order.order_sales_id"
					:options="data_pengguna"
					@model="order.order_sales_id = $event"
				    label="Pilih Sales"
				    required="true"
				    placeholder="Pilih Sales"
				    footnote="Tidak menemukan sales? <a class='text-blue-600' href='/#/master/pengguna/baru'>Tambah baru disini</a>"></Select>
				<Select :value="order.order_pelanggan_id"
						:options="data_pelanggan"
						@model="order.order_pelanggan_id = $event"
					    class="mt-5"
					    label="Pilih Pelanggan"
					    required="true"
					    placeholder="Pilih Pelanggan"
					    footnote="Tidak menemukan pelanggan? <a class='text-blue-600' href='/#/master/pelanggan/baru'>Tambah baru disini</a>"></Select>
				<Select :value="order.order_posisi_stok"
						:options="data_posisi_stok"
						@model="order.order_posisi_stok = $event"
						class="mt-4"
				    	label="Pilih Lokasi Stok"
				    	required="true"
				    	placeholder="Pilih Lokasi Stok"></Select>
			</div>

			<!-- Tanggal, Tanggal Jatuh Tempo -->
			<div class="col-1">
				<Date :value="order.order_tanggal"
					  @model="order.order_tanggal = $event"
				      label="Tanggal"
					  required=true 
					  footnote="Tanggal pembuatan invoice dilakukan"/>
				<Date :value="order.order_tanggal_jatuh_tempo"
					  @model="order.order_tanggal_jatuh_tempo = $event"
					  class="mt-5"
				      label="Tanggal Jatuh Tempo"
					  required=true />
			</div>

			<!-- No Faktur, Catatan Jika Ada -->
			<Text label="No Transaksi" 
				  :value="order.order_id"
				  @input="order.order_id = $event.target.value"
				  required="false"
				  disabled="true"
		  		  placeholder="[Auto Generated]" 
				  footnote="Nomor transaksi anda di<i>generate</i> secara otomatis oleh sistem"/>
		</section>

		<hr class="mt-6 mb-5" />
		
		<!-- Barang Tables -->
		<section class="px-10 mb-8">

			<div class="relative">
				<p class="text-lg font-bold text-gray-800">Daftar Barang Order</p>
				<p class="text-sm mt-0.5 text-gray-500">Kelola daftar barang order dibawah</p>
				<button @click="order.order_item = []" class="absolute right-0 top-0 red-glow-button text-sm"><x class="mr-1 -mt-0.5" />Reset Daftar Barang</button>
			</div>

			<div class="mt-4 grid grid-cols-12 gap-3 bg-green-50 px-5 py-4 rounded-md font-bold text-xs text-green-500">
				<p class="col-span-1">ID</p>
				<p class="col-span-3">NAMA PRODUK</p>
				<p class="col-span-2">SATUAN</p>
				<p class="col-span-2">HARGA SATUAN</p>
				<p class="col-span-2">JUMLAH</p>
				<p class="col-span-2">TOTAL</p>
			</div>

			<div v-for="(pembelian,index) in order_item" 
				 class="grid grid-cols-12 gap-3 px-5 mt-1 mb-1">
				<div class="col-span-4 flex relative">
					<Text :value="data_product[pembelian.barang_id]"
				      	  class="w-full"
				      	  disabled="true"/>
				    <Trash @click="deleteItemList(index)"
				    	width="6" 
				    	height="6" 
				    	class="cursor-pointer text-red-500 hover:text-red-500 transition absolute px-1 py-1 -mt-1 -ml-2 rounded-full bg-red-100" />
				</div>
				<Select @model="pembelian.barang_satuan = $event"
						:value="pembelian.barang_satuan"
						disabled="true"
					    class="col-span-2" 
					    placeholder="Pilih Satuan"
					    :options="data_satuan"/>
				<Text @input="pembelian.barang_harga = $event.target.value" 
					  :value="pembelian.barang_harga"
					  class="col-span-2"
					  placeholder="Ex.3"></Text>
				<Text @input="pembelian.barang_jumlah = $event.target.value"
				      :value="pembelian.barang_jumlah"
				 	  class="col-span-2"  
					  placeholder="Ex.3"></Text>
				<Text :value="formatRupiah(pembelian.barang_total)"
					  class="col-span-2"  
					  disabled
					  placeholder="Ex.Rp. 50.000"></Text>
			</div>

			<!-- New item Form -->
			<formAddNewItem :data_product="data_product" 
							:data_satuan="data_satuan"
							:pembelian_item="order.order_item"
							:type="order.order_tipe"
							@newItem=""/>
		</section>

		<hr class="mb-3" />

		<div class="w-full lg:flex lg:justify-end">
			<OrderBill class="w-full md:w-5/12"
					@callback="$router.replace('/order/penjualan/')"
					apiEndpoint="/order/penjualan/form" 
					:enableSaveOrder=true
					v-model:order="order"/>
		</div>
		<hr>
		<section class="px-10 mt-7 mb-28">
			<p class="text-lg font-bold">Daftar Transaksi</p>
			<p class="card ml-0 text-red-100 bg-red-600 font-semibold">
				<Cash class="mr-2" />Belum ada transaksi untuk order ini</p>
		</section>
		
	</div>
</template>

<style type="text/css">

	.list-enter-from{
		opacity: 0;
	}

	.list-enter-to{
		opacity: 1;
	}

	.list-enter{
		transition: all 0.3s ease;
	}

</style>

<script type="text/javascript">
	
	// Modules
	import formHeader from '../components/formHeader.vue'
	import formAddNewItem from '../components/formAddNewItem.vue'
	import Order from '../models/Order.js'
	import OrderBill from '../components/component_order_bill.vue'

	// Components
	import Text from '@/components/form_component/text.vue'
	import Date from '@/components/form_component/date.vue'
	import Select from '@/components/form_component/select.vue'
	import Tables from '@/components/table.vue';
	
	// Icons
	import Save from '@/assets/icons/save.vue';
	import Cash from '@/assets/icons/cash.vue';
	import Plus from '@/assets/icons/plus.vue';
	import Trash from '@/assets/icons/trash.vue';
	import x from '@/assets/icons/x.vue';
	
	// api
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';
	import {formatRupiah, startLoading, endLoading} from '@/functions/universal.js';

	const sweet = require('sweetalert2');
	const axios = require('axios');

	export default{
		components : {formHeader, formAddNewItem, 
					  Tables, Text, Select, Date, 
					  Save, Cash, Plus, Trash, x, OrderBill},

		computed : {
			order_item(){
				let order_item = this.order.order_item;
				this.order.order_sub_total = 0;
				if(order_item){
					order_item.forEach((item, index) => {
						let barang_total = item.barang_harga * item.barang_jumlah;
						order_item[index].barang_total = barang_total;
						this.order.order_sub_total += barang_total;
					}, order_item)
					return order_item;
				}
				return []
			}
		},
		data(){
			return{
				order : new Order(),
				data_supplier : [],
				data_product  : [],
				data_satuan   : [],
				data_posisi_stok : [],
				data_pengguna : [],
				data_pelanggan : [],
				table_head : ["ID", "NAMA PRODUK", "JUMLAH", "SATUAN", "PAJAK", "TOTAL"],
				table_body : [],

				disc_type  : 1, // 1 for Rupiah, 2 for Percentage
				disc_value : 0,
			}
		},
		methods : {

			deleteItemList(index){
				this.order.order_item.splice(index, index+1);
				sweet.fire("Berhasil", "Item berhasil dihapus", "success");
			},

			formatRupiah(val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			getData(){
				startLoading(sweet);
				const app = this;
				axios.get(DEFAULT_ENDPOINT + "/order/penjualan/form/" + app.$route.params.id)
					 .then(response => {
					 	console.log(response.data);
					 	setTimeout(function(){
					 		app.order = response.data.order;
						 	app.data_supplier  = response.data.data_supplier;
						 	app.data_product   = response.data.data_barang;
						 	app.data_satuan    = response.data.data_satuan;
						 	app.data_posisi_stok = response.data.data_posisi_stok;
						 	app.data_pelanggan = response.data.data_pelanggan;
						 	app.data_pengguna = response.data.data_pengguna;
							sweet.close();
						},500);
				})
			}
		},
		created(){
			this.getData();
		}
	}
</script>