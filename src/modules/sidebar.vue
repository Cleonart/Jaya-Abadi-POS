<template>

	<!-- Sidebar Container -->
	<div class="sidebar-container">
		
		<!-- Sidebar Offset -->
		<div class="md:w-20"></div>

		<div class="sidebar-navigation-container sidebar-navigation-container-md"
				:style="{backgroundColor : color.primary}">
				<img @click="toggleSidebar()" src="../assets/logo.png" class="w-24 mb-4 mt-5">
				<SidebarNav :sidebar="sidebar"/>
		</div>

		<!-- Sidebar Navigation Contol 
		<div class="sidebar-navigation-container sidebar-navigation-container-md"
			:style="{backgroundColor : color.primary}">
			<div class="px-3 relative">
				<a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
              </a>
				<div class="mb-5">
					<img @click="toggleSidebar()" src="../assets/logo.png" class="w-20 mt-5">
				</div>
				<svg @click="dropdown_open = !dropdown_open" class="text-white md:hidden absolute top-1/2 --translate-2/4 transform	 w-8 right-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
			</div>

			<div class="w-full transition md:block" 
				:class="{'hidden' : !dropdown_open, 'block' : dropdown_open}" >

				<router-link to="/order/pos">
				<p class="flex font-bold w-auto pl-4 rounded py-2 text-sm text-white pointer hover:bg-green-600 hover:text-green-200 transition mx-3 bg-green-300 bg-opacity-60 mb-5 relative"><svg class="w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Point of Sales</p></router-link>

				<SidebarNav :sidebar="sidebar"/>
			</div> 
	    </div>-->
	
	</div>

</template>

<style scoped>
	
	*{
		user-select: none; /* supported by Chrome and Opera */
   		-webkit-user-select: none; /* Safari */
   		-khtml-user-select: none; /* Konqueror HTML */
   		-moz-user-select: none; /* Firefox */
   		-ms-user-select: none; /* Internet Explorer/Edge */
	}

	.sidebar-container{
		@apply h-full bg-green-600;
	}

	.sidebar-navigation-container{
		@apply w-full h-full sm:w-full h-auto pl-2 pr-2 pb-1 shadow-lg;
	}

	.sidebar-navigation-container-md{
		@apply overflow-y-scroll bg-green-600 z-50 md:w-20 md:hover:w-60 transform transition-all md:h-full md:fixed;
	}

</style>

<script>
	import SidebarNav from "./sidebar/components/sidebar_nav_item.vue";

	export default{
		components : {
			SidebarNav
		},
		data(){
			return{
				dropdown_open : false,
				sidebar : [
		          {
		            name : "Dashboard",
		            link : "#",
		            icon : "home"
		          },
		          {
		            name   : "Master",
		            active : false,
		            icon   : "category",
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
		              },
		              {
		                name : "Data Perusahaan",
		                link : "/#/master/perusahaan/default"
		              }]
		          },
		          {
		            name   : "Pembelian",
		            active : false,
		            icon   : "shopping-bag",
		            child  : [
		              {
		                name : "Daftar",
		                link : '/#/order/pembelian'
		              },
		              {
		                name : "Pembelian",
		                link : '/#/order/pembelian/baru'
		              },
		              {
		                name : "Retur Beli",
		                link : '#'
		              },]
		          },
		          {
		            name     : "Penjualan",
		            active   : false,
		            icon     : "store",
		            child    : [{
		                name : "Point of Sales",
		                link : "/#/order/pos"
		              },
		              {
		                name : "Daftar",
		                link : "/#/order/penjualan"
		              },
		              {
		              	name : "Order Baru",
		              	link : "/#/order/penjualan/baru"
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
		            icon     : "globe",
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
		              },
		              {
		                name : "Transfer Stok",
		                link : "/#/pengaturan/merek"
		              },
		              {
		                name : "Stok Opname",
		                link : "/#/pengaturan/merek"
		              }
		            ]
		          }
		      ],
			}
		},
		methods : {
			toggleSidebar(){
				alert("tes");
			},
			
		},
		props : ['color']
	}
</script>