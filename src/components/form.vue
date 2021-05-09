<template>
	<div class="mb-4">
		<p class="text-2xl font-semibold mt-8">{{title}}</p>
		<form class="mb-12" @submit.prevent="postData()"> 
			<div v-for="input in input_group" class="mt-4">

				<!-- label -->
				<p class="mb-1.5 mt-0 text-gray-800 text-sm">
					{{input.label}}<span v-if="input.required" class="text-red-500">*</span>
				</p>

				<!-- text input -->
				<input v-if="input.type == 'text'"
				       v-model="input.value" 
					   class="border w-full py-3 px-3 rounded-md" 
					   type="text" 
					   :required="input.required" 
					   :placeholder="input.placeholder" >

				<!-- select input -->
				<select v-if="input.type == 'select'" 
						v-model="input.value"
				        class="border w-full py-3 px-3 rounded-md bg-transparent" >
					<option value="" disabled>Silahkan pilih disini</option>
					<option v-for="item in input.option" :value="item.value">{{item.label}}</option>
				</select>
			</div>

			<!-- Button -->
			<div class="mt-5 pt-1 border-top-200 border border-b-0 border-l-0 border-r-0">
				<button class="bg-green-500 mt-3 font-semibold px-5 py-3 rounded-md text-white mr-2">Simpan</button>
				<button class="mt-3 font-semibold px-5 py-3 rounded-md text-red-500 border-red-200">Batal</button>
			</div>

		</form>
	</div>
</template>

<script type="text/javascript">
	
	import {DEFAULT_ENDPOINT, startLoading} from '../functions/universal.js';
	const axios = require('axios');
	const sweet = require('sweetalert2');

	export default{
		data(){
			return{
				input_group : []
			}
		},
		props : ['title', 'url_get', 'url_post'],
		methods : {

			getData : function(id){
				var app = this;
				startLoading(sweet);
				axios.get(DEFAULT_ENDPOINT + this.url_get + "/" + id)
				 .then(response => {
				 	app.input_group = response.data;
				 	sweet.close();
				 	console.log(response.data)
				})
			},

			postData : function(){
				const app = this;

				sweet.fire({
					title: 'Anda yakin?',
					text: "Apakah anda yakin ingin menambahkan transaksi pembelian ini?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#2ecc71',
					cancelButtonColor: '#e74c3c',
					confirmButtonText: 'Ya, Tambahkan'
				}).then((result) => {
					if(result.isConfirmed){
						startLoading(sweet);
						axios({
							method: 'POST',
							url: DEFAULT_ENDPOINT + app.url_post,
							data: app.input_group
						}).then(response => {
							if (response.status == 200) {
								sweet.fire("Proses Berhasil", "Penambahan dan perubahan data berhasil dilakukan", "success");
							}
							else{
								sweet.close();
							}
						});
					}
				});
			}
		},
		created(){
			this.getData(this.$route.params.id);
		}
	}
</script>