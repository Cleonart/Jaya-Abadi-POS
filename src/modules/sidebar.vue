<template>

	<div class="relative h-full">

		<!-- sidebar -->
		<div class="md:w-60"></div>
		<div class="w-full sm:w-full md:overflow-y md:pb-3 md:w-60 overflow-y-scroll h-auto md:h-full pl-2 pr-2 pb-1 shadow-lg md:fixed"

			:style="{backgroundColor : color.primary}">
			
			<!-- header -->
			<div class="px-3 relative">
				<div class="mb-5">
					<img src="../assets/logo.png" class="w-20 mt-5">
				</div>
				<svg @click="dropdown_open = !dropdown_open" class="text-white md:hidden absolute top-1/2 --translate-2/4 transform	 w-8 right-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
			</div>

			<div class="w-full transition md:block" 
				:class="{'hidden' : !dropdown_open, 'block' : dropdown_open}" >

				<!-- button -->
				<p class="flex font-bold w-auto pl-4 rounded py-2 text-sm text-white pointer hover:bg-green-600 hover:text-green-200 transition mx-3 bg-green-300 bg-opacity-60 mb-5 relative"><svg class="w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Point of Sales</p>

				<div v-for="(link,index) in sidebar" :key='index' class="cursor-pointer">
					<p class="relative px-3 flex py-2.5 text-white font-semibold text-sm hover:bg-white hover:text-green-500 rounded transition" @click="dropdownOpen(index)">
						<svg class="w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
						</svg>
						{{link.name}}
						<svg v-if="!link.link" class="w-4 absolute right-3 top-2.5 mt-0.5 transition transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{'rotate-0' : !link.active, 'rotate-180' : link.active}">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
						</svg>
					</p>
					
					<!-- dropdown -->
					<div v-show="link.child && link.active == true" class="py-2 mt-2 mb-2 rounded shadow-lg text-green-500 bg-white w-auto mx-3">
						<p v-for="(child,index) in link.child" :key='index' class="relative transform transition hover:translate-x-1 hover:text-green-400 font-semibold text-sm px-4 py-1 pointer">
							<a :href="child.link" class="block">{{child.name}}<svg class="hover:block w-4 absolute right-3 top-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></a>
						</p>
					</div>
				</div>
				<p class="mt-2 flex font-bold w-auto pl-4 rounded py-2 text-sm text-red-100 pointer hover:bg-red-600 hover:text-red-200 transition mx-3 bg-red-400 mb-5 relative"><svg class="w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>Keluar</p>
				<div class="h-5"></div>
			</div>
	    </div>
	
	</div>

</template>

<style scoped type="text/css">
	
	*{
		user-select: none; /* supported by Chrome and Opera */
   		-webkit-user-select: none; /* Safari */
   		-khtml-user-select: none; /* Konqueror HTML */
   		-moz-user-select: none; /* Firefox */
   		-ms-user-select: none; /* Internet Explorer/Edge */
	}

</style>

<script>
	export default{
		data(){
			return{
				dropdown_open : false,
				sidebar : [
		          {
		            name : "Dashboard",
		            link : "#",
		            icon : "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
		          },
		          {
		            name   : "Master",
		            active : false,
		            icon   : "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
		            child  : [
		              {
		                name : "Barang",
		                link : "/#/master/barang"
		              },
		              {
		                name : "Supplier",
		                link : "/#/master/supplier"
		              },
		              {
		                name : "Pelanggan",
		                link : "/#/master/pelanggan"
		              },
					  {
		                name : "Nomor Faktur",
		                link : "#"
		              },
		              {
		                name : "Pengguna",
		                link : "/#/master/pengguna"
		              }]
		          },
		          {
		            name   : "Pembelian",
		            active : false,
		            icon   : "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
		            child  : [
		              {
		                name : "Daftar",
		                link : '/#/pembelian/order'
		              },
		              {
		                name : "Pembelian",
		                link : '/#/pembelian/order/id/baru'
		              },
		              {
		                name : "Retur Beli",
		                link : '#'
		              },]
		          },
		          {
		            name     : "Penjualan",
		            active   : false,
		            icon     : "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
		            child    : [{
		                name : "Point of Sales",
		                link : "/#/penjualan/pos"
		              },
		              {
		                name : "Sales Order",
		                link : "#"
		              },
		              {
		                name : "Invoice",
		                link : "#"
		              },
		              {
		                name : "Retur Jual",
		                link : "#"
		              }]
		          },
		          {
		            name     : "Pengaturan",
		            icon     : "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
		            child    : [
		              {
		                name : "Satuan",
		                link : "/#/pengaturan/satuan"
		              },
		              {
		                name : "Kategori",
		                link : "/#/pengaturan/kategori"
		              },
		              {
		                name : "Merek",
		                link : "/#/pengaturan/merek"
		              }
		            ]
		          }
		      ],
			}
		},
		methods : {
			dropdownOpen : function(index){
			
				// check if button is link or dropdown
				if(this.sidebar[index].link){
					this.$router.replace("/");
					for(var i = 0; i < this.sidebar.length; i++){
						if(i == index){
							continue;
						}
						this.sidebar[i].active = false;
					}
					return;
				}

				if(this.sidebar[index].active == false){
					this.sidebar[index].active = true;
					for(var i = 0; i < this.sidebar.length; i++){
						if(i == index){
							continue;
						}
						this.sidebar[i].active = false;
					}
				}
				else{
					this.sidebar[index].active = false;
				}
			}
		},
		props : ['color']
	}
</script>