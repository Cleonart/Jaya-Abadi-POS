<template>
	<div>

		<div class="px-10 relative">
			<p class="text-2xl font-bold mt-8">Buat Pembelian Baru</p>
			<p class="text-sm text-gray-500">Pembelian baru akan tercatat disini</p>
			<p class="font-bold text-xl mt-1 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-3/4">Total {{formatRupiah(pembelian_data.pembelian_total)}}</p>
		</div>

		<hr class="border-2 mb-6 mt-4" />

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

			<div v-for="(pembelian,index) in pembelian_data.pembelian_item" class="grid grid-cols-12 gap-3 px-5 mt-1 mb-1">

				<div class="col-span-4 flex">
					<div class="mr-1 mt-5">
						<svg @click="deleteItemList(index)" class="h-5 w-5 stroke-current text-red-500 hover:text-red-200 transition cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</div>
					<Text :value="data_product[pembelian.barang_id]"
				      	  class="w-full"
				      	  disabled="true"/>
				</div>
				
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
					  disabled
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
					  disabled
					  placeholder="Ex.Rp. 50.000"/>
				<button @click="addToItemList()" class="col-span-2 bg-green-500 text-white text-sm font-semibold rounded-md py-2 -mt-2">Tambah Barang</button>
			</div>
		</div>		
		<hr class="mb-3" />
		
		<!-- ********* -->
		<!-- SECTION 3 -->
		<!-- ********* -->
		<section class="grid md:grid-cols-6 px-10">
			<div class="col-span-4"></div>
			<div class="col-span-2 flex px-5 py-5 mb-3">
				<div class="w-1/2">
					<p class="mb-3">Sub Total</p>
					<p class="mb-3">Potongan</p>
					<p class="text-xl mt-5 font-bold">Tagihan</p>
				</div>
				<div class="w-1/2 text-right">
					<p class="mb-3 text-right" >{{formatRupiah(pembelian_data.pembelian_sub_total)}}</p>
					<div class="flex w-full">
						<select v-model="disc_type" class="rounded-md mr-2 bg-green-100 text-xs px-1">
							<option value="1">Rupiah</option>
							<option value="2">Persen</option>
						</select>
						<input type="number" class="border w-full rounded-md text-sm px-1 pl-2 py-1" v-model="pembelian_data.pembelian_diskon"/>
					</div>
					<p class="text-xl mt-3 font-bold">{{formatRupiah(pembelian_data.pembelian_total)}}</p>
					<p class="font-semibold text-xs mt-2">
						<span class="text-green-600 bg-green-200 px-2 py-1 rounded-full" v-if="pembelian_data.pembelian_diskon == 0">Tidak ada potongan</span>
						<span class="text-red-50 bg-red-600 px-2 py-1 rounded-full" v-else>
							<span v-if="disc_type == 1">-{{formatRupiah(pembelian_data.pembelian_diskon)}}</span>
							<span v-if="disc_type == 2">{{pembelian_data.pembelian_diskon}}%</span>
						</span>
					</p>
				</div>
			</div>
		</section>
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
	import {formatRupiah, DEFAULT_ENDPOINT, startLoading, endLoading} from '../../../functions/universal.js';
	
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

					this.pembelian_data.pembelian_sub_total = subtotal;

					if(this.disc_type == 1){
						this.pembelian_data.pembelian_total = subtotal - this.pembelian_data.pembelian_diskon;
					}

					else{
						let diskon_persen = (subtotal * (this.pembelian_data.pembelian_diskon/100))
						this.pembelian_data.pembelian_total = subtotal - diskon_persen;
					}
				},
				deep:true
			},
			
			"pembelian_data.pembelian_diskon" :  function(val){
				
				if(val < 0){
					this.pembelian_data.pembelian_diskon = 0;
				}

				
				if(this.disc_type == 2){
					if(val > 100){
						this.pembelian_data.pembelian_diskon = 0;
						sweet.fire("Operasi ilegal", "<b>Potongan</b> tidak boleh melebihi nilai <b class='text-red-600'>subtotal</b>", "error");
						return;
					}
				}

				// can't more than the total 	
				if(val > this.pembelian_data.pembelian_sub_total){
					this.pembelian_data.pembelian_diskon = 0;
					sweet.fire("Operasi ilegal", "<b>Potongan</b> tidak boleh melebihi nilai <b class='text-red-600'>subtotal</b>", "error");
				}
			},

			"barang.barang_id" : function(val){
				const app = this;
				if(val != ""){
					startLoading(sweet)
					axios.get(DEFAULT_ENDPOINT + "/master/barang/data/" + app.barang.barang_id)
						 .then(response => {
						 	console.log(response);
						 	app.barang = response.data;
							sweet.close();
					})
				}
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
					pembelian_tanggal   : "",
					pembelian_tanggal_jatuh_tempo : "",
					pembelian_item      : [],
					pembelian_diskon    : 0,
					pembelian_sub_total : 0,
					pembelian_total     : 0,
					pembelian_status    : "",
				},
				barang : {
					barang_id : '',
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
				disc_type  : 1, // 1 for Rupiah, 2 for Percentage
				disc_value : 0,
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
					barang_id     : '',
					barang_satuan : '',
					barang_jumlah : '',
					barang_harga  : '',
					barang_total  : '',
				}
			},

			deleteItemList : function(index){
				const app = this;
				app.pembelian_data.pembelian_item.splice(index, index+1);
				sweet.fire("Berhasil", "Item berhasil dihapus", "success");
			},

			formatRupiah : function (val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			getData : function(){
				startLoading(sweet);
				const app = this;
				axios.get(DEFAULT_ENDPOINT + "/pembelian/order/" + app.$route.params.id)
					 .then(response => {
					 	console.log(response);
					 	app.data_supplier = response.data.data_supplier;
					 	app.data_product  = response.data.data_product;
					 	app.data_satuan   = response.data.data_satuan;
						sweet.close();
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
						startLoading(sweet);
						axios.post(DEFAULT_ENDPOINT + "/pembelian/order/baru", this.pembelian_data)
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