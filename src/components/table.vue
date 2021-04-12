<template>
	<div>
		<div class="w-full overflow-x-auto ">
			<table class="overflow-x-auto w-full text-md bg-white rounded mb-4">
				<tbody>
					<tr class="text-xs text-green-500 bg-green-50 rounded">
						<th v-for="head in table_head" class="text-left p-3 px-6">{{head}}</th>
					</tr>
					<tr v-for="(container_item,index) in table_body"
						v-show="((index + 1) >= pagination_start && index <= pagination_end)"
						:class="{'bg-gray-50' : (index % 2 > 0)}"
					    class="hover:bg-green-200 transition pointer text-sm font-semibold text-gray-800">

					    <td v-for="item in container_item"
					     	class="p-3 px-6 py-3">

					     	<span v-if="item.type == 'badge'" 
					     		  class="rounded-full bg-green-100 text-green-700 px-4 py-1.5">
					     		  {{item.text}}
					     	</span>

					     	<span v-else-if="item.type == 'text'">
					     		  {{item.text}}
					     	</span>

					     	<span v-else-if="item.type == 'price'">
					     		  {{formatRupiah(item.text)}}
					     	</span>

					    </td>

					    <td class="p-3 px-5 py-4">
		                    <div class="flex">
		                    	<svg class="py-2 px-2 bg-green-100 text-green-700 mr-2 pointer rounded-md w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
		                    </div>
		                </td>
		                
					</tr>
				</tbody>
			</table>

			<p v-if="table_body.length <= 0" class="relative mx-5 w-auto bg-red-100 text-red-500 font-semibold text-1xl pl-5 py-4 rounded-md">Tidak ada data ditemukan :(</p>

			<div class="flex mb-10 mt-5 ml-4">
		    	<p  v-for="item in pagination_num_of_page"  
		    		@click="navigateToPage(item)"
		    		:class="{'bg-green-600 font-bold text-white' : item == pagination_page_now}" 
		    		class="rounded-full pointer py-2 px-2 w-10 text-center mr-1 h-10 bg-green-100">{{item}}</p>
		    </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	import {formatRupiah} from '../functions/universal.js';

	export default{
		props : ["table_head", "table_body"],
		data(){
			return{
				pagination_per_page    : 10,
				pagination_num_of_page : 1,
				pagination_page_now    : 1,
				pagination_start       : 1, 
				pagination_end         : 10
			}
		},
		methods : {
			formatRupiah : function(angka){
				return "Rp. " + formatRupiah(String(angka));
			},
			navigateToPage : function(page){
				this.pagination_page_now = page;
				this.pagination_start = (this.pagination_per_page * page) - (this.pagination_per_page - 1);
				this.pagination_end	  = this.pagination_per_page * page;
			}
		},
		created(){
			let number_of_item = this.table_body.length;
			while(number_of_item > this.pagination_per_page){
				number_of_item -= this.pagination_per_page;
				this.pagination_num_of_page++;
			}
		}
	}

</script>