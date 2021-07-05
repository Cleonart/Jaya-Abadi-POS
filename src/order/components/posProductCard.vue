<template>
	<div class="w-full border rounded-lg px-4 pt-2 hover:bg-green-200 pointer">
		<div class="text-xs mt-3 -ml-1">
			<span class="px-2 py-1 text-green-600 font-semibold rounded-full bg-green-200 w-auto text-center">{{titleCase(item.kategori_nama)}}</span>
		</div>
		<p class="font-bold text-base text-gray-800 mt-1.5 ">{{titleCase(item.barang_nama)}}</p>
		<p class="text-sm text-gray-400">{{titleCase(item.barang_varian)}}</p>
		<div class="flex text-sm font-semibold mt-4">
			<span>
				<Home class="mr-1"/>
				<span v-if="item.barang_stok_toko > 0">{{item.barang_stok_toko}}</span>
				<span v-else class="ml-2 font-bold">Habis</span>
			</span>
			<span class="ml-2">
				<OfficeBuilding/>
				<span v-if="item.barang_stok_gudang > 0">{{item.barang_stok_gudang}}</span>
				<span v-else class="text-red-500 font-bold">Habis</span>
			</span>
		</div>
		<p class="mt-1 mb-4 font-bold text-green-600">{{formatRupiah(item.barang_harga_jual)}}</p>
	</div>
</template>
<script type="text/javascript">
	import Home from "@/assets/icons/home.vue";
	import OfficeBuilding from "@/assets/icons/officeBuilding.vue";

	import { titleCase } from "title-case";
	import {formatRupiah} from '@/functions/universal.js';

	export default{
		props : ['item'],
		components : {Home, OfficeBuilding},
		methods : {
			titleCase(str){
				return titleCase(str.toLowerCase());
			},
			formatRupiah(val) {
				return formatRupiah(val.toString(), "Rp.");
			},
		}
	}
</script>