<!--component_order_bill.vue
	Handling Order Bill for Order Component
	Short-hand for easy-of-use bill handling
	HOW-TO-USE
		
	// Import First
	import OrderBill from '../components/component_order_bill.vue';

	// Register to Component
	components : {OrderBill}

	// Use in Template
	// Don't forget to put appropriate Order Model
	<OrderBill v-model:order="order"/>
-->
<template>
	<section class="order-bill-container">
		
		<!-- Transaction Modal -->
		<Modal ref="modal_transaction">
			<template v-slot:content>
				<section class="mb-3">
					<h1 class="text-lg font-bold">Format Transaksi</h1>
					<p class="text-sm text-gray-500">Selesaikan transaksi disini</p>
				</section>
				<table>
					<tr>
						<td class="text-lg font-bold">Tagihan</td>
						<td class="text-right text-lg font-bold">{{formatRupiah(order.order_total)}}</td>
					</tr>
				</table>
				<section class="mt-3">
					<p class="font-semibold text-gray-500 text-xs my-2">SWITCH TUNAI</p>
					<hr/>
					<table class="mt-2">
						<tr>
							<td>Jumlah Pembayaran</td>
							<td>
								<input type="number" placeholder="Nominal Pembayaran" v-model="transaction_nominal" class="text-right">
							</td>
						</tr>
						<tr>
							<td>
								<p>Kembalian</p>
								<p class="text-xs mt-0.5 font-bold text-red-600">Perhatikan Uang Kembalian!</p>
							</td>
							<td class="text-right">{{formatRupiah(transaction_nominal - order.order_total)}}</td>
						</tr>
					</table>
				</section>
			</template>	
		</Modal>

		<table>
			<thead>
	    		<tr>
	      			<th class="w-1/2"></th>
	      			<th class="w-1/2"></th>
	    		</tr>
	  		</thead>
			<tr>
				<td>Sub Total</td>
				<td class="text-right">{{formatRupiah(order.order_sub_total)}}</td>
			</tr>
			<tr>
				<td>Potongan</td>
				<td class="flex justify-end">
					<select class="rounded-md mr-2 bg-green-100 text-xs px-1" 
							v-model="order.order_diskon_tipe">
						<option selected value="RUPIAH">Rupiah</option>
						<option value="PERCENTAGE">Persen</option>
					</select>
					<input type="number" class="order-discount-input" v-model="order.order_diskon">
				</td>
			</tr>
			<tr>
				<td>Switch</td>
				<td class="text-right">Tunai</td>
			</tr>
			<tr class="text-xl font-bold">
				<td class="text-xl">Total</td>
				<td class="text-xl text-right">
					{{formatRupiah(order_total)}}
					<p class="font-semibold text-xs mt-2.5">
						<span class="text-green-600 bg-green-200 px-2 py-1 rounded-full" 
							v-if="order.order_diskon == 0">Tidak ada potongan</span>
						<span class="text-red-50 bg-red-600 px-2 py-1 rounded-full" v-else>
							<span v-if="order.order_diskon_tipe == 'RUPIAH'">
								-{{formatRupiah(order.order_diskon)}}
							</span>
							<span v-if="order.order_diskon_tipe == 'PERCENTAGE'">
								{{order.order_diskon}}%
							</span>
						</span>
					</p>
				</td>
			</tr>
		</table>
		<div class="w-full grid gap-2 mt-3" 
			v-show="order_status" 
			:class="{'md:grid-cols-2' : enableSaveOrder}">
			<button v-show="enableSaveOrder" 
					@click="processOrder('ST202')" 
					class="blue-glow-button">
					<Save class="-mt-1 mr-1"/> Simpan</button>
			<button class="green-glow-button" 
					@click="$refs.modal_transaction.openModal()">
					<Cash class="-mt-1 mr-1"/> Selesai</button>
		</div>
		<button class="red-glow-button w-full mt-3"
				@click="$router.go(-1)" 
				v-show="!order_status">Batal</button>
	</section>
</template>

<script type="text/javascript">

	// Peripheral
	import Modal from "@/components/modal.vue";
	import {formatRupiah} from '@/functions/universal.js';

	// API's
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';
	const axios = require('axios');

	// UI's
	import {start} from '@/core/SwalLoader.js';
	import Save from '@/assets/icons/save.vue';
	import Cash from '@/assets/icons/cash.vue';
	const sweet = require('sweetalert2');

	export default{
		data(){
			return{
				transaction_nominal : ""
			}
		},
		props : {
			order : Object,
			enableSaveOrder : Boolean,
			apiEndpoint : String
		},
		components : {
			Modal, Save, Cash
		},
		computed : {
			order_total(){
				// Get order_sub_total from order
				let subtotal = this.order.order_sub_total;

				// Discount with Rupiah Selected
				if(this.order.order_diskon_tipe == "RUPIAH"){
					let discount_value = this.order.order_diskon;
					this.order.order_total = subtotal - discount_value;
					return this.order.order_total;
				}

				// Discount with Percentage Selected
				let discount_value = this.order.order_diskon;
				let discount_percentage = (subtotal * (discount_value/100))
				let discount_total = subtotal - discount_percentage;
				this.order.order_total = discount_total;

				// Trigger v-model
				this.$emit("input", this.order);
				return this.order.order_total = subtotal - discount_percentage;
			},
			order_status(){
				if(this.order.order_status != "ST200"){
					return true;
				}
				return false;
			}
		},
		watch : {

			// Discount separated into multi select
			// "RUPIAH" : Discount according to specific amount of money
			// "PERCENTAGE" : Discount according to order_sub_total percentage
			"order.order_diskon"(discount_value){
				this.discountHandler(discount_value);
			},
			"order.order_diskon_tipe"(discount_type){
				this.discountHandler(this.order.order_diskon);
			},
		},
		methods : {

			discountHandler(discount_value){
				let title = "Operasi Ilegal";
				let subtitle = "<b>Potongan</b> tidak boleh melebihi nilai \
								<b class='text-red-600'>subtotal</b>"

				// Value of discount must above 0
				if(discount_value < 0){
					this.order.order_diskon = 0;
					return;
				}

				if(this.order.order_diskon_tipe == "PERCENTAGE"){
					if(discount_value > 100){
						this.order.order_diskon = 0;
						sweet.fire(title, subtitle, "error");
						return;
					}
				}

				// Value of Discount can't more than the total 	
				if(discount_value > this.order.order_sub_total){
					this.order.order_diskon = 0;
					sweet.fire(title, subtitle, "error");
				}
			},

			processOrder(order_status){
				const APP = this;
				const ENDPOINT = DEFAULT_ENDPOINT + APP.apiEndpoint;
				this.order.order_status = order_status;

				sweet.fire({
					title: 'Proses Pesanan?',
					text: "Anda yakin ingin memproses pesanan ini?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#2ecc71',
					cancelButtonColor: '#e74c3c',
					confirmButtonText: 'Ya, Tambahkan'
				}).then((result) => {
					if(result.isConfirmed){
						start(sweet);
						axios.post(ENDPOINT, APP.order)
							.then(response => {
								sweet.fire(
									'Pesanan Berhasil Diproses',
									'Data pesanan berhasil diproses',
									'success');
								APP.$emit('callback', "success");
							})
					}
				}).catch(error => {
					sweet.fire(
						'Proses Pesanan Gagal',
						'Aww, nampaknya pesanan gagal diproses, silahkan memeriksa jaringan internet anda, jika internet anda berjalan baik, silahkan mencoba me-refresh ulang aplikasi mencoba memproses pesanan lagi',
						'error');
					APP.$emit('callback', "error");
				});
			},

			/**	Handle Format Number to Rupiah Formats
				Input
					Number, Int, String
				Output
					Formatted String with Rp. at the front
					Rp. XX.XXX - Rp. 10.000
			*/
			formatRupiah(val) {
				return formatRupiah(val.toString(), "Rp.");
			},

		}
	}
</script>

<style scoped>
	
	.order-bill-container{
		@apply px-7 py-3 mb-3;
	}

	table{
		@apply table-fixed w-full
	}

	.order-discount-input{
		@apply border w-20 rounded-md text-sm px-1 pl-2 py-1;
	}

	th, td{
		padding-bottom: 7px;
	}

</style>