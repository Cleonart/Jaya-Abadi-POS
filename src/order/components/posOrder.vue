<template>
	<div class="relative md:fixed md:right-0 min-h-screen md:border-l pt-9">
		
		<Modal ref="modal">
			<template v-slot:content>
				<p class="text-2xl mt-2 font-bold">Pengubahan Harga</p>
				<hr class="my-3" />
				<p class="text-lg">{{barang.barang_id}}</p>
				<Text :value="barang.barang_harga"
					  @input="barang.barang_harga = $event.target.value"
					  label="Ubah Harga"
					  required="true"
					  class="mt-3"  
					  footnote="Harga barang dapat berubah sewaktu-waktu"
					  placeholder="Rp. 2000"/>
			</template>
			<template v-slot:button>
				<button @click="$refs.modal.closeModal()" class="green-glow-button text-sm ml-1">Ubah Harga</button>
			</template>
		</Modal>

		<section class="px-9">

			<div class="relative">
				<p class="font-bold text-2xl">Daftar Pesanan</p>
				<p class="text-sm text-gray-400">Kelola daftar pesanan</p>
				<div class="absolute right-0 top-2 flex">
					<p class="bg-red-200 text-red-500 font-semibold rounded-md py-2 px-4 text-sm">Hapus</p>
				</div>
			</div>

			<div class="mt-5 h-56 pb-4 mb-2 overflow-y-auto">
				<div v-for="(item,index) in order_item" class="flex mb-3">

					<div class="w-5/12 font-semibold text-sm">
						{{barang_by_id(item.barang_id)[0].barang_nama}} - 
						{{barang_by_id(item.barang_id)[0].barang_varian}}<br/>
						<span class="text-xs text-gray-600">
							{{barang_by_id(item.barang_id)[0].merek_nama}},
							{{barang_by_id(item.barang_id)[0].kategori_nama}}
						</span>
					</div>

					<div class="flex w-4/12" >
						
						<svg v-show="item.barang_jumlah > 1" @click="item.barang_jumlah--" class="w-10 py-2 px-2 bg-gray-100 rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
						
						<svg v-show="item.barang_jumlah == 1 || item.qty == item.barang_jumlah " @click="order.order_item.splice(index,1)" class="w-10 py-2 px-2 bg-red-100 rounded-md text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>

						<input type="number" class="border-none w-16 text-center font-bold" min="1" 
							   v-model="item.barang_jumlah">

						<svg @click="item.barang_jumlah++" class="w-10 py-2 px-2 bg-gray-100 rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
					</div>

					<div class="w-3/12 text-right text-sm bold py-2 px-2 w-16 text-center font-bold">
						<p>{{formatRupiah(item.barang_jumlah * item.barang_harga)}}</p>
						<p @click="openModal(index)" class="text-blue-600 text-sm underline cursor-pointer">@{{formatRupiah(item.barang_harga)}}</p>
					</div>
				</div>
				<p 	class="w-full text-red-500 bg-red-50 px-4 py-2 rounded font-semibold" 
					v-if="order.order_item.length == 0">Daftar pesanan masih kosong :(</p>
			</div>
		</section>
		<OrderBill @callback="$router.replace('/order/penjualan')"
				apiEndpoint="/order/pos/form"
				v-model:order="order"/>
	</div>
</template>

<script type="text/javascript">

	import {formatRupiah} from '@/functions/universal.js';
	import Cog from '@/assets/icons/cog.vue';
	import Modal from '@/components/modal.vue';
	import Text from '@/components/form_component/text.vue'
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';
	import {start} from '@/core/SwalLoader.js';

	import OrderBill from '@/order/components/component_order_bill.vue';

	const sweet = require('sweetalert2');
	const axios = require('axios');

	export default{
		props : ['order', 'data_barang'],
		data(){
			return{
				barang : {},
				selected_barang_index : 0,
				disc_type  : 1, // 1 for Rupiah, 2 for Percentage
				disc_value : 0,
			}
		},
		components : {
			Modal, Text, OrderBill
		},
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
			},
		},
		methods : {

			calls(){
				alert("tes");
			},

			openModal(index){
				this.$refs.modal.openModal();
				this.barang = this.order.order_item[index];
			},

			formatRupiah(val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			barang_by_id(id){
				return this.data_barang.filter(barang => {
					return barang.barang_id.toLowerCase().includes(id.toLowerCase());
				})
			}
		},
		created(){
			
		}
	}
</script>

<style scoped type="text/css">
	*{
		user-select: none; /* supported by Chrome and Opera */
   		-webkit-user-select: none; /* Safari */
   		-khtml-user-select: none; /* Konqueror HTML */
   		-moz-user-select: none; /* Firefox */
   		-ms-user-select: none; /* Internet Explorer/Edge */
	}

</style>