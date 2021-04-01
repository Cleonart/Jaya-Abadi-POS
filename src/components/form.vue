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
	
	import {DEFAULT_ENDPOINT} from '../functions/universal.js';
	const axios = require('axios');

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
				axios.get(DEFAULT_ENDPOINT + this.url_get + "/" + id)
				 .then(response => {
				 	app.input_group = response.data;
				 	console.log(response.data)
				})
			},

			postData : function(){
				var app = this;
				axios({
					method: 'POST',
					url: DEFAULT_ENDPOINT + this.url_post,
					data: app.input_group
				}).then(response => {
						if (response.status == 200) {
							alert("Penambahan data berhasil");
						}
						console.log(response);
					});
			}
		},
		created(){
			this.getData(this.$route.params.id);
		}
	}
</script>