<template>
	<div class="relative min-h-screen md:border-l md:pl-8 pt-9">

		<div class="relative">
			<p class="font-bold text-2xl text-base">Daftar Pesanan</p>
			<p class="text-sm text-gray-400">Kelola daftar pesanan</p>
			<div class="absolute right-0 top-2 flex">
				<p class="bg-red-200 text-red-500 font-semibold rounded-md py-2 px-4 text-sm">Hapus</p>
				<svg class="w-9 rounded-md ml-2 py-2 px-2 bg-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
			</div>
		</div>
		
		<!-- list pesanan -->
		<div class="mt-7 h-60">
			<div v-for="(item,index) in order_list" class="flex mb-3">
				<div class="w-5/12 font-semibold text-sm">{{item.name}} - {{item.variation}}
					<br/><span class="text-xs text-gray-600">{{item.brand}}</span></div>
				<div class="flex w-4/12" >
					<svg v-show="item.qty > 1" @click="item.qty--" class="w-10 py-2 px-2 bg-gray-100 rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
					<svg v-show="item.qty == 1 || item.qty == '' " @click="order_list.splice(index,1)" class="w-10 py-2 px-2 bg-red-100 rounded-md text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
					<input type="number" class="border-none w-16 text-center font-bold" min="1" v-model="item.qty">
					<svg @click="item.qty++" class="w-10 py-2 px-2 bg-gray-100 rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
				</div>
				<p class="w-3/12 text-right text-sm bold py-2 px-2 w-16 text-center font-bold">Rp. {{item.qty * item.price}}</p>
			</div>
		</div>

		<div class="w-full">
			<div class="shadow px-4 py-2 rounded pt-2">
				<p class="flex py-1">
					<span class="w-6/12 text-gray-600 font-semibold">Subtotal</span>
					<span class="w-6/12 text-right font-bold">Rp.{{sub_total}}</span>
				</p>
				<p class="flex py-1">
					<span class="w-6/12 text-gray-600 font-semibold">Diskon</span>
					<span class="w-6/12 text-right font-bold text-red-500">-Rp. 20.000</span>
				</p>
				<p class="flex py-1">
					<span class="w-6/12 text-gray-600 font-semibold">Pajak</span>
					<span class="w-6/12 text-right font-bold text-green-500">+Rp. 20.000</span>
				</p>
				<p class="flex py-1.5 mt-2 mb-2">
					<span class="w-6/12 text-gray-900 text-2xl">Total</span>
					<span class="w-6/12 text-right font-bold text-2xl font-bold">Rp. 20.000</span>
				</p>
			</div>
			<p class="font-semibold w-full text-center py-3 mt-4 bg-green-600 hover:bg-green-400 text-white text-sm rounded-lg pointer">Lanjutkan ke Pembayaran</p>
		</div>
	</div>
</template>

<style type="text/css">
	*{
		user-select: none; /* supported by Chrome and Opera */
   		-webkit-user-select: none; /* Safari */
   		-khtml-user-select: none; /* Konqueror HTML */
   		-moz-user-select: none; /* Firefox */
   		-ms-user-select: none; /* Internet Explorer/Edge */
	}
</style>

<script type="text/javascript">
	export default{
		props : ['order_list'],
		data(){
			return{
				sub_total : 0,
				total     : 0,
				disc      : 0,
				tax       : 0,
			}
		},
		watch : {
			order_list : {
				handler(val){
					this.calculatePriceAndValidateQty();
				},
				deep : true
			}
		},
		methods : {
			calculatePriceAndValidateQty : function(){
				this.sub_total = 0;
				for(var i = 0; i < this.order_list.length; i++){
					if(this.order_list[i].qty < 0){
						this.order_list[i].qty = 1;
					}
					this.sub_total += this.order_list[i].qty * this.order_list[i].price;
				}	
			}
		},
		created(){
			this.calculatePriceAndValidateQty();
		}
	}
</script>