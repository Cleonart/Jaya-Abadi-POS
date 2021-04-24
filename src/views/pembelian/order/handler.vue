<template>
	<div>

		<div class="px-10 relative">
			<p class="text-2xl font-bold mt-8">Buat Pembelian Baru</p>
			<p class="text-sm text-gray-500">Pembelian baru akan tercatat disini</p>
			<p class="font-bold text-xl mt-1 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-3/4">Total Rp. 0</p>
		</div>

		<hr class="border-2 mb-6 mt-4" />

		<div class="w-56 ml-10">
			
		</div>

		<div class="grid grid-cols-3 gap-8 mt-5 px-10">

			<Select :value="pembelian_data.pembelian_supplier_id"
					:options="data_supplier"
					@model="pembelian_data.pembelian_supplier_id = $event"
				    class="col-span-1"
				    label="Pilih Supplier"
				    required="true"
				    placeholder="Pilih Supplier"
				    footnote="Tidak menemukan supplier? <a class='text-blue-600' href='/#/master/supplier/baru'>Tambah baru disini</a>"></Select>

			<!-- Tanggal, Tanggal Jatuh Tempo -->
			<div class="col-1">

				<Date :value="pembelian_data.pembelian_tanggal"
					  @model="pembelian_data.pembelian_tanggal = $event"
				      label="Tanggal"
					  required=true />

				<Date :value="pembelian_data.pembelian_tanggal_jatuh_tempo"
					  @model="pembelian_data.pembelian_tanggal_jatuh_tempo = $event"
					  class="mt-5"
				      label="Tanggal Jatuh Tempo"
					  required=true />
			</div>

			<!-- No Faktur, Catatan Jika Ada -->
			<Text label="No Transaksi" 
				  :value="pembelian_data.pembelian_id"
				  @input="pembelian_data.pembelian_id = $event.target.value"
				  required="false"
				  disabled="true"
		  		  placeholder="[Auto Generated]" 
				  footnote="Nomor transaksi anda di<i>generate</i> secara otomatis oleh sistem"/>

		</div>

		<!-- Tables -->
		<div class="px-10 mt-10 mb-8">
			<div class="grid grid-cols-12 gap-3 bg-green-50 px-5 py-4 rounded-md font-bold text-xs text-green-500">
				<p class="col-span-1">ID</p>
				<p class="col-span-3">NAMA PRODUK</p>
				<p class="col-span-2">SATUAN</p>
				<p class="col-span-2">HARGA SATUAN</p>
				<p class="col-span-2">JUMLAH</p>
				<p class="col-span-2">TOTAL</p>
			</div>
			<!--
			<transition-group tag="ul" name="list" class="instruments">
				<li v-for="pembelian in pembelian_data.pembelian_item">{{pembelian.barang_id}}</li>
			</transition-group>-->

				<div v-for="pembelian in pembelian_data.pembelian_item" class="grid grid-cols-12 gap-3 px-5 mt-1 mb-1">

					<Text :value="data_product[pembelian.barang_id]"
				    	  class="col-span-4"
				    	  disabled="true"/>

					<Select class="col-span-2"
							:value="pembelian.barang_satuan"
					        @model="pembelian.barang_satuan = $event" 
					        placeholder="Pilih Satuan"
					        :options="data_satuan"/>
					
					<Text :value="pembelian.barang_harga"
					      @input="pembelian.barang_harga = $event.target.value"
						  class="col-span-2"
						  placeholder="Ex.3"></Text>
					
					<Text :value="pembelian.barang_jumlah"
					      @input="pembelian.barang_jumlah = $event.target.value"
						  class="col-span-2"  
						  placeholder="Ex.3"></Text>

					<Text :value="formatRupiah(pembelian.barang_total)"
						  class="col-span-2"  
						  placeholder="Ex.Rp. 50.000"></Text>
				</div>

			<div class="grid grid-cols-12 gap-3 px-5 mt-1 mb-1">

				<Select :value="barang.barang_id"
				    	class="col-span-4"
				    	@model="barang.barang_id = $event"
				    	placeholder="Pilih Barang"
				    	:options="data_product"></Select>

				<Select :value="barang.barang_satuan"
				    	class="col-span-2"
				    	@model="barang.barang_satuan = $event"
				    	placeholder="Pilih Satuan"
				    	:options="data_satuan"></Select>
				
				<Text :value="barang.barang_harga"
				      @input="barang.barang_harga = $event.target.value"
					  class="col-span-2"
					  placeholder="Ex.3"/>
				
				<Text :value="barang.barang_jumlah"
				      @input="barang.barang_jumlah = $event.target.value"
					  class="col-span-2"  
					  placeholder="Ex.3"/>

				<Text :value="formatRupiah(barang.barang_total)"
					  class="col-span-2"  
					  placeholder="Ex.Rp. 50.000"/>
				<button @click="addToItemList()" class="col-span-2 bg-green-500 text-white text-sm font-semibold rounded-md py-2 -mt-2">Tambah Barang</button>
			</div>
		</div>		
		<hr class="mb-3" />
		<div class="grid md:grid-cols-6 px-10">
			<div class="col-span-4"></div>
			<div class="col-span-2 flex px-5 py-5 mb-3">
				<div class="w-1/2">
					<p class="mb-3">Sub Total</p>
					<p class="mb-3">Potongan</p>
						<div class="flex w-20 -mt-1">
							<select>
								<option>Persen</option>
								<option>Rupiah</option>
							</select>
							<input type="text" class="border w-16" name="">
						</div>
					<p class="text-xl mt-3 font-bold">Tagihan</p>
				</div>
				<div class="w-1/2">
					<p class="mb-3 text-right" >{{formatRupiah(pembelian_data.pembelian_total)}}</p>
					<p class="mb-3 text-right">Rp. 0</p><br/>
					<p class="text-right text-xl mt-3 font-bold">{{formatRupiah(pembelian_data.pembelian_total)}}</p>
				</div>
			</div>
		</div>
		<div class="bg-gray-50 relative h-20 w-full">
			<div class="absolute top-1/2 transform -translate-y-2/4 right-16">
				<button class="text-white rounded-md font-semibold text-sm mr-2 bg-red-500 px-3 py-3">Batal</button>
				<button @click="postData('ST202')" class="text-white rounded-md font-semibold text-sm mr-2 bg-green-500 px-3 py-3">Buat Order</button>
				<button @click="postData('ST200')" class="text-white rounded-md font-semibold text-sm bg-green-500 px-3 py-3">Buat Order dan Bayar</button>
			</div>
		</div>
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
	import Text from '@/components/form_component/text.vue'
	import Date from '@/components/form_component/date.vue'
	import Select from '@/components/form_component/select.vue'
	import Tables from '../../../components/table.vue';
	import {formatRupiah, DEFAULT_ENDPOINT} from '../../../functions/universal.js';
	
	const sweet = require('sweetalert2');
	const axios = require('axios');

	export default{
		components : {Tables, Text, Select, Date},
		watch : {
			pembelian_data : {
				handler : function(value){
					let total = 0;
					let subtotal = 0;

					// calculate the price for each product item
					for(let i = 0; i <  this.pembelian_data.pembelian_item.length; i++){
						let pembelian_barang_jumlah = this.pembelian_data.pembelian_item[i].barang_jumlah;
						let pembelian_barang_harga  = this.pembelian_data.pembelian_item[i].barang_harga;
						this.pembelian_data.pembelian_item[i].barang_total = pembelian_barang_harga * pembelian_barang_jumlah;
						subtotal += pembelian_barang_jumlah * pembelian_barang_harga;
					}

					this.pembelian_data.pembelian_total = subtotal;

				},
				deep:true
			},

			"barang.barang_jumlah" : function(){
				this.barang.barang_total = this.barang.barang_jumlah * this.barang.barang_harga;
			},

			"barang.barang_harga" : function(){
				this.barang.barang_total = this.barang.barang_jumlah * this.barang.barang_harga;
			}
		},
		data(){
			return{
				pembelian_data : {
					pembelian_id : "",
					pembelian_supplier_id : "",
					pembelian_tanggal : "",
					pembelian_tanggal_jatuh_tempo : "",
					pembelian_item : [],
					pembelian_diskon : 0,
					pembelian_total  : 0,
					pembelian_status : "",
				},
				barang : {
					barang_id : '',
					barang_nama : '',
					barang_satuan : '',
					barang_jumlah : '',
					barang_harga : '',
					barang_total : '',
				},
				data_supplier : [],
				data_product  : [],
				data_satuan   : [],
				table_head : ["ID", "NAMA PRODUK", "JUMLAH", "SATUAN", "PAJAK", "TOTAL"],
				table_body : [],
			}
		},
		methods : {
			addToItemList : function(){
				var app = this;
				let item_exist = false;

				for(var i = 0; i < this.pembelian_data.pembelian_item.length; i++){
					if(this.barang.barang_id == this.pembelian_data.pembelian_item[i].barang_id){
						let total = parseInt(this.pembelian_data.pembelian_item[i].barang_jumlah) + parseInt(this.barang.barang_jumlah);
						this.pembelian_data.pembelian_item[i].barang_jumlah = total;
						item_exist = true;
					}
				}

				if (!item_exist) {
					this.pembelian_data.pembelian_item.push({
						barang_id : app.barang.barang_id,
						barang_satuan : app.barang.barang_satuan,
						barang_jumlah : app.barang.barang_jumlah,
						barang_harga : app.barang.barang_harga,
						barang_total : app.barang.barang_total,
					});
				}

				this.barang = {
					barang_id : '',
					barang_nama : '',
					barang_satuan : '',
					barang_jumlah : '',
					barang_harga : '',
					barang_total : '',
				}
			},

			tes : function(val){
				console.log(val);
			},

			formatRupiah : function (val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			getData : function(){
				const app = this;
				axios.get(DEFAULT_ENDPOINT + "/pembelian/order")
					 .then(response => {
					 	console.log(response);
					 	app.data_supplier = response.data.data_supplier;
					 	app.data_product  = response.data.data_product;
					 	app.data_satuan   = response.data.data_satuan;
				})
			},

			postData : function(status_code){
				const app = this;
				this.pembelian_data.pembelian_status = status_code;
				sweet.fire({
					title: 'Anda yakin?',
					text: "Apakah anda yakin ingin menambahkan transaksi pembelian ini?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#2ecc71',
					cancelButtonColor: '#e74c3c',
					confirmButtonText: 'Ya, Tambahkan'
				}).then((result) => {
					if(result.isConfirmed){
						axios.post(DEFAULT_ENDPOINT + "/pembelian/order", this.pembelian_data)
							 .then(response => {
							sweet.fire(
								'Proses Berhasil',
								'Data pembelian berhasil diubah',
								'success'
							);
					})
				}})
			}
		},
		created(){
			this.getData();
		}
	}
</script>