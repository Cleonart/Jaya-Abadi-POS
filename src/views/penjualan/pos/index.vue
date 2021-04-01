<template>
	<div class="w-full md:flex">
		<div class="w-full md:w-7/12 md:pr-8">
			<p class="font-bold text-3xl mt-6">Daftar Barang</p>
			<p class="text-sm text-gray-400 mt-1.5">Barang yang dipilih akan dimasukan ke dalam order</p>
			<div class="flex relative mt-6">
				<svg class="w-6 mr-3 top-1 mt-0.2 text-gray-400 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				<input type="text" class="w-full text-2xl pb-2.5 pl-9 mb-3 transition border-b focus:border-green-300" placeholder="Cari barang disini.." name="">
			</div>

			<div class="flex">
				<span class="mr-2 px-4 py-1 rounded-full border font-semibold text-sm hover:bg-green-300 transition pointer hover:-translate-y-0.5 transform" v-for="(item,index) in category"  @click="changeCategory(index)"  :class="{'bg-green-200' : item.active, 'text-green-600' : item.active}">{{item.name}}</span>
			</div>

			<div class="grid grid-cols-3 gap-3 mt-5">	
				<div class="w-full border rounded-lg px-4 pt-2 hover:bg-green-200 pointer" v-for="item in goods">
					<div class="text-xs mt-3 -ml-1">
						<span class="px-2 py-1 text-green-600 font-semibold rounded-full bg-green-200 w-auto text-center">{{item.category}}</span>
					</div>
					<p class="font-bold text-base text-gray-800 mt-1.5">{{item.name}}</p>
					<p class="text-sm text-gray-400">{{item.variation}}</p>

					<div>
						<span class="flex text-sm font-semibold mt-4">
							<svg class="w-4 -mt-0.5 mr-1.5" :class="{'text-red-500' : item.stock_store <= 0}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
							<span v-if="item.stock_store > 0">{{item.stock_store}}</span>
							<span v-else class="text-red-500 font-bold">Habis</span>
							
							<svg class="w-4 -mt-0.5 mr-1.5 ml-2"  :class="{'text-red-500' : item.stock_warehouse <= 0}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
							<span v-if="item.stock_warehouse > 0">{{item.stock_warehouse}}</span>
							<span v-else class="text-red-500 font-bold">Habis</span>
						</span>
					</div>

					<p class="mt-1 mb-4 font-bold text-green-600">{{item.price}}</p>
				</div>
			</div>
		</div>
		<Order class="md:w-5/12 md:mr-9" :order_list="order_list"/>
	</div>
</template>

<script type="text/javascript">
	
	import Order from './order.vue';

	export default{
		data(){
			return{
				goods : [
					{
						name : "Paku Beton",
						variation : "2cm",
						category : "Pertukangan",
						price : "Rp. 2000",
						stock_store : 0,
						stock_warehouse : 0
					},
					{
						name : "Paku Beton",
						variation : "4cm",
						category : "Pertukangan",
						price : "Rp. 2000",
						stock_store : 0,
						stock_warehouse : 0
					},
					{
						name : "Cat",
						variation : "Putih",
						category : "Pertukangan",
						price : "Rp. 50.000",
						stock_store : 20,
						stock_warehouse : 20
					},

				],
				category : [
					{
						name : "Semua",
						active : true
					},
					{
						name : "Pertukangan",
						active : false
					},
				],
				order_list : [
					{
						id : "22",
						name : "Paku beton",
						variation : "2 cm",
						brand : 'Umum',
						qty  : 2,
						price : 10000, 
					},
					{
						id : "22",
						name : "Cat Tembok",
						variation : "Putih",
						brand : "Catylac",
						qty : 6,
						price : 100, 
					}
				]
			}
		},
		components:{
			Order
		},
		methods : {
			changeCategory : function(index){
				this.category[index].active = true;
				for(var i = 0; i < this.category.length; i++){
					if(i != index){
						this.category[i].active = false;
					}
				}
			}
		}
	}
</script>

