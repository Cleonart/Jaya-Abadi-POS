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
					<select class="rounded-md mr-2 bg-green-100 text-xs px-1" v-model="discount_type">
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
							<span v-if="discount_type == 'RUPIAH'">
								-{{formatRupiah(order.order_diskon)}}
							</span>
							<span v-if="discount_type == 'PERCENTAGE'">
								{{order.order_diskon}}%
							</span>
						</span>
					</p>
				</td>
			</tr>
		</table>
		<div class="w-full grid gap-2 mt-3" :class="{'md:grid-cols-2' : enableSavedOrder}">
			<button v-show="enableSaveOrder" @click="processOrder('ST201')" 
					class="blue-glow-button">Simpan</button>
			<button class="green-glow-button" @click="processOrder('ST200')">Bayar & Selesai</button>
		</div>
	</section>
</template>

<script type="text/javascript">

	// Peripheral
	import {formatRupiah} from '@/functions/universal.js';

	// API's
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';
	const axios = require('axios');

	// UI's
	import {start} from '@/core/SwalLoader.js';
	const sweet = require('sweetalert2');

	export default{
		data(){
			return{
				// Discount separated into multi select
				// "RUPIAH" : Discount according to specific amount of money
				// "PERCENTAGE" : Discount according to order_sub_total percentage
				discount_type : "RUPIAH"
			}
		},
		props : {
			order : Object,
			enableSaveOrder : Boolean,
		},
		computed : {
			order_total(){
				// Get order_sub_total from order
				let subtotal = this.order.order_sub_total;

				// Discount with Rupiah Selected
				if(this.discount_type == "RUPIAH"){
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
			}
		},
		watch : {

			"order.order_diskon"(discount_value){
				
				let title = "Operasi Ilegal";
				let subtitle = "<b>Potongan</b> tidak boleh melebihi nilai \
								<b class='text-red-600'>subtotal</b>"

				// Value of discount must above 0
				if(discount_value < 0){
					this.order.order_diskon = 0;
					return;
				}

				if(this.discount_type == "PERCENTAGE"){
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
			}
		},
		methods : {


			processOrder(order_status){
				const APP = this;
				const ENDPOINT = DEFAULT_ENDPOINT + "/order/pos/form";
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
								APP.$router.replace("/order/penjualan");
							})
					}
				}).catch(error => {
					sweet.fire(
						'Proses Pesanan Gagal',
						'Aww, nampaknya pesanan gagal diproses, silahkan memeriksa jaringan internet anda, jika internet anda berjalan baik, silahkan mencoba me-refresh ulang aplikasi mencoba memproses pesanan lagi',
						'error');
					console.log(error);
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
		@apply px-7 py-3 border-t
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