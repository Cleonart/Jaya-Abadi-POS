<template>
	<div>

		<div class="px-10 relative">
			<p class="text-2xl font-bold mt-8">Buat Pembelian Baru</p>
			<p class="text-sm text-gray-500">Pembelian baru akan tercatat disini</p>
			<p class="font-bold text-xl mt-1 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-3/4">Total Rp. 0</p>
		</div>

		<hr class="border-2 mb-6 mt-4" />

		<div class="grid grid-cols-3 gap-8 mt-5 px-10">
			
			<!-- supplier -->
			<div class="col-1">
				<p class="text-gray-800 mb-1.5">Supplier<span class="text-red-600">*</span></p>
				<select class="border w-full py-3 px-3 rounded-md bg-transparent" >
					<option disabled selected>Pilih Supplier</option>
					<option v-for="supplier in data_supplier" value="supplier.supplier_id">{{supplier.supplier_nama}}</option>
				</select>
				<p class="text-xs mt-2">Tidak menemukan supplier? <a class="text-blue-600" href="/#/master/supplier/baru">Tambah baru disini</a></p>
			</div>

			<!-- Tanggal, Tanggal Jatuh Tempo -->
			<div class="col-1">

				<div>
					<p class="text-gray-800 mb-1.5">Tanggal<span class="text-red-600">*</span></p>
					<input type="date" class="border w-full py-2 px-3 rounded-md bg-transparent" >
				</div>

				<div class="mt-5">
					<p class="text-gray-800 mb-1.5">Tanggal Jatuh Tempo<span class="text-red-600">*</span></p>
					<input type="date" class="border w-full py-2 px-3 rounded-md bg-transparent" >
				</div>
			</div>

			<!-- No Faktur, Catatan Jika Ada -->
			<div class="col-1">
				<div>
					<p class="text-gray-800 mb-1.5">No Transaksi<span class="text-red-600">*</span></p>
					<input type="text" class="border w-full py-2 px-3 rounded-md bg-transparent" placeholder="[Auto Generated]">
					<p class="text-xs mt-2">Nomor transaksi anda di<i>generate</i> secara otomatis oleh sistem</p>
				</div>
			</div>
		</div>
		<Tables class="mt-10 px-10" :table_head="table_head" :table_body="table_body"></Tables>
		<hr class="mb-3" />
		<div class="grid md:grid-cols-6">
			<div class="col-span-4"></div>
			<div class="col-span-2 flex px-5 py-5 mb-3">
				<div class="mr-28">
					<p class="mb-3">Sub Total</p>
					<p class="mb-3">Total</p>
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
				<div class="text-right">
					<p class="mb-3" >Rp. 0</p>
					<p class="mb-3">Rp. 0</p>
					<p class="mb-3">Rp. 0</p><br/>
					<p class="text-xl mt-3 font-bold">{{formatRupiah(pembelian_data.pembelian_total)}}</p>
				</div>
			</div>
		</div>

		<div class="bg-gray-50 relative h-20 w-full">
			<div class="absolute top-1/2 transform -translate-y-2/4 right-16">
				<button class="text-white rounded-md font-semibold text-sm mr-2 bg-red-500 px-3 py-3">Batal</button>
				<button class="text-white rounded-md font-semibold text-sm mr-2 bg-green-500 px-3 py-3">Buat Order</button>
				<button class="text-white rounded-md font-semibold text-sm bg-green-500 px-3 py-3">Buat Order dan Bayar</button>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Tables from '../../../components/table.vue';
	import {formatRupiah, DEFAULT_ENDPOINT} from '../../../functions/universal.js';
	const axios = require('axios');

	export default{
		components : {Tables},
		data(){
			return{
				pembelian_data : {
					pembelian_diskon : 0,
					pembelian_total  : 0
				},
				data_supplier : [],
				data_product  : [],
				table_head : ["PRODUK ID", "NAMA PRODUK", "JUMLAH", "SATUAN", "PAJAK", "JUMLAH"],
				table_body : [],
			}
		},
		methods : {
			
			formatRupiah : function (val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			getData : function(){
				const app = this;
				axios.get(DEFAULT_ENDPOINT + "/pembelian/order/baru")
					 .then(response => {
					 	app.data_supplier = response.data.data_supplier;
				})
			}
		},
		created(){
			this.getData();
		}
	}
</script>