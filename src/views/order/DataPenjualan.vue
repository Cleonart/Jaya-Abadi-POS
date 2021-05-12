<template>
	<div>
		<loading :active="loadingActive"/>
		<MenuHeader title="Daftar Order Penjualan" 
					subtitle="Daftar order dan transaksi penjualan dapat dilihat disini" 
					@refresh="getData()"/>
		
		<div class="grid grid-cols-3 gap-3 px-10">
			<div class="col-1" v-for="item in pembelian_data">
				<div class="shadow-md rounded-md">
					<p :class="'bg-' + item.color + '-300 border-'+item.color+'-400'" class="border relative font-bold px-4 py-2 pb-3 rounded-t-md">{{item.title}} <span :class="'bg-' + item.color + '-200'" class="absolute right-3 px-1 rounded-md">30</span></p>
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
	import MenuHeader from '@/modules/order/menuHeader.vue'
	import Tables from '@/components/table.vue';
	import Pencil from '@/assets/icons/pencil.vue';
	import Loading from 'vue-loading-overlay';
	import {formatRupiah, DEFAULT_ENDPOINT} from '@/functions/universal.js';
	const axios = require('axios');

	export default{
		components : {Tables, Pencil, MenuHeader, Loading},
		data(){
			return{
				search_bar : "",
				loadingActive : false,
				pembelian_data : [
					{
						title : "Penjualan Belum Dibayar",
						color : "red",
						total : 0,
						len   : 0
					},
					{
						title : "Penjualan Jatuh Tempo",
						color : "yellow",
						total : 0,
						len   : 0
					},
					{
						title : "Penjualan Selesai",
						color : "green",
						total : 0,
						len   : 0
					}
				],
				table_head : ["ID", "SALES", "PELANGGAN", "TANGGAL INVOICE / JATUH TEMPO", "STATUS", "TAGIHAN", "AKSI"],
				table_body : [],
			}
		},
		computed : {
			filteredData(){
				return this.table_body.filter(tableData => {
					return tableData[1].text.toLowerCase().includes(this.search_bar.toLowerCase());
				});
			}	
		},
		methods : {
			getData : function(){
				const app = this;
				app.loadingActive = true;
				axios.get(DEFAULT_ENDPOINT + "/orders/penjualan")
				     .then(response => {
				     	console.log(response);
				     	app.pembelian_data[0].total = response.data.pembelian_belum_dibayar;
				     	app.pembelian_data[2].total = response.data.pembelian_selesai;
				     	app.table_body = response.data.pembelian_data;
				     	setTimeout(function(){
				     		app.loadingActive = false;
				     	},500);
				     })
			},
			formatRupiah : function (val) {
				return formatRupiah(val.toString(), "Rp.");
			},
		},
		created(){
			this.getData();
		}
	}
</script>