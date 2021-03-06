<template>
	<div>
		<loading :active="loadingActive"/>
		<MenuHeader title="Daftar Order Pembelian" 
					subtitle="Daftar transaksi pembelian dapat dilihat disini" 
					@refresh="getData()"
					route="/order/pembelian/baru"/>

		<!-- Order Status -->
		<div class="grid grid-cols-3 gap-3 px-10">
			<div class="col-1" v-for="item in order_status">
				<div class="shadow-md rounded-md">
					<p :class="'bg-' + item.color + '-300 border-'+item.color+'-400'" class="border relative font-bold px-4 py-2 pb-3 rounded-t-md">{{item.title}} <span :class="'bg-' + item.color + '-200'" class="absolute right-3 px-1 rounded-md">{{item.len}}</span></p>
					<div :class="'bg-' + item.color + '-50 border-'+item.color+'-200' " class="border px-4 -mt-2 pt-1 pb-3 rounded-b-md">
						<p class="text-sm text-gray-600 mt-3">Total</p>
						<p class="text-2xl">{{formatRupiah(item.total)}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="rounded-b-md shadow mx-10 relative bg-white">
			<Tables class="mt-10" :table_head="table_head" :table_body="table_body">
				<template v-slot:default="props">
					<div class="flex my-1">
						<a :href="'/#/order/pembelian/' + props.actionProps[0].text">
							<span class="px-2 py-2 bg-green-100 text-green-700 mr-2 pointer rounded-md hover:bg-gray-800 hover:text-white transition">
								<Pencil/>
							</span>
						</a>
					</div>
				</template>
			</Tables>
		</div>
	</div>
</template>

<script type="text/javascript">

	// UI Components
	import MenuHeader from '../components/menuHeader.vue'
	import Tables from '@/components/table.vue';
	import Pencil from '@/assets/icons/pencil.vue';
	import Loading from 'vue-loading-overlay';
	
	// API's
	import {DEFAULT_ENDPOINT} from '@/core/APIService.js';
	import {formatRupiah} from '@/functions/universal.js';
	const axios = require('axios');

	// Peripheral
	import {sum} from "@/core/Math.js";

	export default{
		components : {Tables, Pencil, MenuHeader, Loading},
		data(){
			return{
				search_bar : "",
				loadingActive : false,
				order_status : [
					{
						title : "Pembelian Belum Dibayar",
						color : "red",
						total : 0,
						len   : 0
					},
					{
						title : "Pembelian Jatuh Tempo",
						color : "yellow",
						total : 0,
						len   : 0
					},
					{
						title : "Pembelian Selesai",
						color : "green",
						total : 0,
						len   : 0
					}
				],
				table_head : ["ID", "SUPPLIER", "TANGGAL INVOICE / JATUH TEMPO", 
							  "STATUS", "TAGIHAN", "AKSI"],
				table_body : [],
			}
		},
		computed : {
			
			filteredData(){
				return this.table_body.filter(tableData => {
					return tableData[1].text.toLowerCase().includes(this.search_bar.toLowerCase());
				});
			},
		},
		methods : {

			getData : function(){
				const app = this;
				app.loadingActive = true;
				axios.get(DEFAULT_ENDPOINT + "/order/pembelian/table")
				     .then(response => {
				     	console.log(response);
				     	app.table_body = response.data;
				     	
				     	// ST202 - Data Order Belum Dibayar
				     	app.order_status[0].total = sum(app.filter_order_transaction("MENUNGGU PEMBAYARAN"), 4);
				     	app.order_status[0].len = app.filter_order_transaction("MENUNGGU PEMBAYARAN").length;
				     	
				     	// ST201 Data Order Jatuh Tempo
				     	app.order_status[1].total = sum(app.filter_order_transaction("JATUH TEMPO"), 4);
				     	app.order_status[1].len = app.filter_order_transaction("JATUH TEMPO").length;
				     	
				    	// ST200 Data Order Selesai
				     	app.order_status[2].total = sum(app.filter_order_transaction("SELESAI"), 4);
				     	app.order_status[2].len = app.filter_order_transaction("SELESAI").length;

				     	setTimeout(function(){
				     		app.loadingActive = false;
				     	},200);
				     })
			},

			formatRupiah : function (val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			filter_order_transaction(order_status){
				return this.table_body.filter(tableData => {
					return tableData[3].text.toLowerCase().includes(order_status.toLowerCase());
				})
			},
		},
		created(){
			this.getData();
		}
	}
</script>