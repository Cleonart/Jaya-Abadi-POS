<template>
	<div class="pb-10">
		<Loading :active="loadingState"/>
		<div class="pb-2 bg-white shadow pt-4 px-10 flex">
			<span @click="goBack()" class="header_form"><ChevronLeft class="-mt-1" /></span>
			<div class="inline-block ml-2">
				<p class="text-2xl text-gray-700 font-semibold">{{title}}</p>
				<p class="text-sm mt-1 text-gray-500 mb-2">Silahkan mengisi semua data dengan benar</p>
			</div>
		</div>
		<form class="form-container" @submit.prevent="post()"> 
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
				<button class="green-glow-button"><Save class="mr-2 -mt-1"/>Simpan</button>
				<p class="cursor-pointer hover:text-red-50 hover:bg-red-500 transition ml-2 mt-3 font-semibold px-5 py-3 rounded-md text-red-500 border-red-200 inline-block" @click="goBack()">Batal</p>
			</div>

		</form>
	</div>
</template>

<style type="text/css" scoped>

	.header_form{
		@apply rounded-md bg-green-100 text-green-500 px-2 py-1 mr-3 cursor-pointer hover:bg-gray-800 hover:text-white transition text-2xl text-gray-700 font-semibold inline-block  h-10 mt-2;
	}

	.form-container{
		@apply mb-12 px-5 mx-10 bg-white rounded-md pt-2 pb-5 mt-8 shadow-md;
	}

</style>

<script type="text/javascript">
	
	import {DEFAULT_ENDPOINT, startLoading} from '../functions/universal.js';
	import Save from '@/assets/icons/save.vue';
	import ChevronLeft from '@/assets/icons/chevronLeft.vue';
	import Loading from 'vue-loading-overlay';
	const axios = require('axios');
	const sweet = require('sweetalert2');

	export default{
		data(){
			return{
				loadingState : true,
				input_group : []
			}
		},
		components : {Loading, Save, ChevronLeft},
		props : ['title', 'url_get', 'url_post', 'home'],
		methods : {
			
			// Router function for go back one time
			goBack : function(){
				this.$router.replace(this.home);
			},

			get : function(id){
				const app = this;
				app.loadingState = true;
				axios.get(DEFAULT_ENDPOINT + this.url_get + "/" + id)
				 .then(response => {
				 	app.input_group = response.data;
				 	app.loadingState = false;
				 	console.log(response.data);

				})
			},

			post : function(){
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
						app.loadingState = true;
						axios({
							method: 'POST',
							url: DEFAULT_ENDPOINT + app.url_post,
							data: app.input_group
						}).then(response => {
							app.loadingState = false;
							if (response.status == 200) {
								sweet.fire("Proses Berhasil", "Penambahan dan perubahan data berhasil dilakukan", "success");
								app.goBack();
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
			this.get(this.$route.params.id);
		}
	}
</script>