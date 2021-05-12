<template>
	<div>

		<formHeader title="Buat Penjualan Baru" subtitle="Order penjualan baru akan dicatat disini" :total="formatRupiah(pembelian_data.pembelian_total)"/>

		<div class="grid grid-cols-3 gap-8 mt-5 px-10 mt-8">

			<div class="col-1">
				<Select :value="pembelian_data.order_sales_id"
						:options="data_pengguna"
						@model="pembelian_data.order_sales_id = $event"
					    label="Pilih Sales"
					    required="true"
					    placeholder="Pilih Sales"
					    footnote="Tidak menemukan sales? <a class='text-blue-600' href='/#/master/pengguna/baru'>Tambah baru disini</a>"></Select>

				<Select :value="pembelian_data.order_customer_id"
						:options="data_pelanggan"
						@model="pembelian_data.order_customer_id = $event"
					    class="mt-5"
					    label="Pilih Pelanggan"
					    required="true"
					    placeholder="Pilih Pelanggan"
					    footnote="Tidak menemukan pelanggan? <a class='text-blue-600' href='/#/master/pelanggan/baru'>Tambah baru disini</a>"></Select>
			</div>

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

		<hr class="mt-6 mb-5" />
		
		<!-- Tables -->
		<div class="px-10 mb-8">

			<div class="relative">
				<p class="text-lg font-bold text-gray-800">Daftar Barang Order</p>
				<p class="text-sm mt-0.5 text-gray-500">Kelola daftar barang order dibawah</p>
				<button @click="pembelian_data.pembelian_item = []" class="absolute right-0 top-0 red-glow-button text-sm"><x class="mr-1 -mt-0.5" />Reset Daftar Barang</button>
			</div>

			<div class="mt-4 grid grid-cols-12 gap-3 bg-green-50 px-5 py-4 rounded-md font-bold text-xs text-green-500">
				<p class="col-span-1">ID</p>
				<p class="col-span-3">NAMA PRODUK</p>
				<p class="col-span-2">SATUAN</p>
				<p class="col-span-2">HARGA SATUAN</p>
				<p class="col-span-2">JUMLAH</p>
				<p class="col-span-2">TOTAL</p>
			</div>

			<div v-for="(pembelian,index) in pembelian_data.pembelian_item" 
				 class="grid grid-cols-12 gap-3 px-5 mt-1 mb-1">

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
						disabled="true"
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

			<formAddNewItem :data_product="data_product" :data_satuan="data_satuan" @newItem="addItem($event)"/>
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

		<div class="bg-gray-50 relative mb-20 w-full mt-5">
			<div class="absolute top-1/2 transform -translate-y-2/4 right-16">
				<button class="text-white rounded-md font-semibold text-sm mr-2 bg-red-500 px-3 py-3">Batal</button>
				<button @click="postData('ST202')" class="blue-glow-button text-sm h-10 mr-2"><Save class="mr-2 -mt-1" />Buat Order</button>
				<button @click="postData('ST200')" class="green-glow-button text-sm h-10"><Cash class="mr-2" />Buat Order dan Bayar</button>
			</div>
		</div>

		<hr>
		<section class="px-10 mt-7 mb-28">
			<p class="text-lg font-bold">Daftar Transaksi</p>
			<p class="card ml-0 text-red-100 bg-red-600 font-semibold"><Cash class="mr-2" />Belum ada transaksi untuk order ini</p>
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
	
	// modules
	import formHeader from '@/modules/order/formHeader.vue'
	import formAddNewItem from '@/modules/order/formAddNewItem.vue'

	// components
	import Text from '@/components/form_component/text.vue'
	import Date from '@/components/form_component/date.vue'
	import Select from '@/components/form_component/select.vue'
	import Tables from '@/components/table.vue';
	
	// icons
	import Save from '@/assets/icons/save.vue';
	import Cash from '@/assets/icons/cash.vue';
	import Plus from '@/assets/icons/plus.vue';
	import x from '@/assets/icons/x.vue';
	
	// api
	import {formatRupiah, DEFAULT_ENDPOINT, startLoading, endLoading} from '@/functions/universal.js';

	const sweet = require('sweetalert2');
	const axios = require('axios');

	export default{
		components : {formHeader, formAddNewItem, 
					  Tables, Text, Select, Date, 
					  Save, Cash, Plus, x},
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

		},

		data(){
			return{
				pembelian_data : {
					pembelian_id                  : "",
					order_type                    : 200,
					order_sales_id                : "",
					order_customer_id             : "",
					pembelian_supplier_id         : "",
					pembelian_tanggal             : "",
					pembelian_tanggal_jatuh_tempo : "",
					pembelian_item                : [],
					pembelian_diskon              : 0,
					pembelian_sub_total           : 0,
					pembelian_total               : 0,
					pembelian_status              : "",
				},
				barang : {
					barang_id : '',
					barang_satuan : '',
					barang_jumlah : '',
					barang_harga : '',
					barang_total : '',
				},

				data_supplier : [],
				data_pelanggan : [],
				data_pengguna : [],
				data_product  : [],
				data_satuan   : [],
				table_head : ["ID", "NAMA PRODUK", "JUMLAH", "SATUAN", "PAJAK", "TOTAL"],
				table_body : [],
				disc_type  : 1, // 1 for Rupiah, 2 for Percentage
				disc_value : 0,
			}
		},
		methods : {

			addItem : function(barang){
				let item_exist = false;
				let orderItemData = this.pembelian_data.pembelian_item;

				/* When item already registered on Order List [pembelian_data.pembelian_item] 
				   only add the quantitu of the item
				*/
				for(var i = 0; i < orderItemData.length; i++){
					if(barang.barang_id == orderItemData[i].barang_id){
						let total = parseInt(orderItemData[i].barang_jumlah) + parseInt(barang.barang_jumlah);
						this.pembelian_data.pembelian_item[i].barang_jumlah = total;
						item_exist = true;
					}
				}

				/* if item don't exist, push item on Order List */
				if (!item_exist) {
					this.pembelian_data.pembelian_item.push({
						barang_id     : barang.barang_id,
						barang_satuan : barang.barang_satuan,
						barang_jumlah : barang.barang_jumlah,
						barang_harga  : barang.barang_harga,
						barang_total  : barang.barang_total,
					});
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
				axios.get(DEFAULT_ENDPOINT + "/order/" + app.$route.params.id)
					 .then(response => {
					 	console.log(response);
					 	app.data_supplier  = response.data.data_supplier;
					 	app.data_product   = response.data.data_product;
					 	app.data_satuan    = response.data.data_satuan;
					 	app.data_pelanggan = response.data.data_pelanggan;
						app.data_pengguna  = response.data.data_pengguna;
						sweet.close();
				})
			},

			postData : function(status_code){
				const app = this;
				const versionOneEndpoint = DEFAULT_ENDPOINT + "/pembelian/order/baru";
				const versionTwoEndpoint = DEFAULT_ENDPOINT + "/order/" + this.$route.params.id;

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
						axios.post(versionTwoEndpoint, this.pembelian_data)
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