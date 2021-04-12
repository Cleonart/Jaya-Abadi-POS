<template>
	<div>
		<div class="px-10 mt-8 relative">
			<p class="font-bold text-2xl">Transaksi Pembelian</p>
			<p class="text-gray-400">Daftar transaksi pembelian dapat dilihat disini</p>
			<button class="bg-green-600 font-bold px-6 mt-1 text-sm py-2 rounded-full text-white md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-3/4 ">Pembelian Baru</button>
		</div>
		<hr class="border-2 mb-6 mt-4" />
		<div class="grid grid-cols-3 gap-3 px-10">
			<div class="col-1" v-for="item in pembelian_data">
				<div>
					<p :class="'bg-' + item.color + '-300'" class="relative font-bold px-4 py-2 pb-3 rounded-t-md">{{item.title}} <span :class="'bg-' + item.color + '-200'" class="absolute right-3 px-1 rounded-md">30</span></p>
					<div :class="'bg-' + item.color + '-50' " class="px-4 -mt-2 pt-1 pb-3 rounded-b-md">
						<p class="text-sm text-gray-600 mt-3">Total</p>
						<p class="text-2xl">Rp. 0</p>
					</div>
				</div>
			</div>
		</div>
		<Tables class="mt-10 px-10" :table_head="table_head" :table_body="table_body"></Tables>
	</div>
</template>

<script type="text/javascript">
	import Tables from '../../../components/table.vue';
	export default{
		components : {Tables},
		data(){
			return{
				pembelian_data : [
					{
						title : "Pembelian Belum Dibayar",
						color : "red",
						total : 10000
					},
					{
						title : "Pembelian Jatuh Tempo",
						color : "yellow",
						total : 10000
					},
					{
						title : "Pembelian Selesai",
						color : "green",
						total : 10000
					}
				],
				table_head : ["TANGGAL", "ID", "SUPPLIER", "JATUH TEMPO", "STATUS", "TAGIHAN"],
				table_body : [],
			}
		}
	}
</script>