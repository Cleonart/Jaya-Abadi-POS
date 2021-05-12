<template>
	<div>

		<!-- Top Card for add new item status -->
		<transition name="fade" mode="out-in">
			<div v-if="cardInfoActive" class="card">
				<InformationCircle class="mt-0.5" />
				<div class="ml-2">
					<span class="font-semibold">Form Penambahan Barang</span><br/>
					<span>Silahkan menambahkan barang dengan melengkapi kolom-kolom yang tersedia dibawah</span>
				</div>
			</div>
			<div v-else-if="cardSuccessActive" class="card text-green-600 bg-green-100">
				<InformationCircle class="mt-0.5" />
				<div class="ml-2">
					<span class="font-semibold">Penambahan Berhasil</span><br/>
					<span>Barang berhasil ditambahkan</span>
				</div>
			</div>
		</transition>

		<!-- New item form -->
		<div class="grid grid-cols-12 gap-3 px-5 mt-1 mb-1">
			<Select :value="barang.barang_id"
					class="col-span-4"
					@model="barang.barang_id = $event"
					placeholder="Pilih Barang"
					:options="data_product"></Select>

			<Select :value="barang.barang_satuan"
					disabled="true"
					class="col-span-2"
					@model="barang.barang_satuan = $event"
					placeholder="Pilih Satuan"
					:options="data_satuan"></Select>

			<Text 	:value="barang.barang_harga"
					@input="barang.barang_harga = $event.target.value"
					class="col-span-2"
					placeholder="Ex.3"/>

			<Text 	:value="barang.barang_jumlah"
					@input="barang.barang_jumlah = $event.target.value"
					class="col-span-2"  
					placeholder="Ex.3"/>

			<Text 	:value="formatRupiah(barangNominalTotal)"
					class="col-span-2"  
					disabled
					placeholder="Ex.Rp. 50.000"/>

			<div class="col-span-12">
				<button @click="triggerNewItem()" class="green-button"><Plus/> Tambah Barang</button>
				<button class="red-glow-button ml-2">Reset</button>
			</div>

		</div>
	</div>

</template>

<style type="text/css">

	.card{
		@apply px-5 mx-5 py-3 shadow-sm rounded-md mt-2 text-sm text-blue-600 bg-blue-100 flex;
	}

</style>

<script type="text/javascript">
	
	// components
	import Text from '@/components/form_component/text.vue'
	import Select from '@/components/form_component/select.vue'

	// icons
	import Plus from '@/assets/icons/plus.vue';
	import InformationCircle from '@/assets/icons/informationCircle.vue';

	// api
	import {formatRupiah, DEFAULT_ENDPOINT, startLoading, endLoading} from '@/functions/universal.js';
	const sweet = require('sweetalert2');
	const axios = require('axios');

	export default{
		components : {Text, Select, Plus, InformationCircle},
		props: ["data_product", "data_satuan"],
		data(){
			return{
				// immutable
				cardInfoActive : true,
				cardSuccessActive : false,
				cardErrorActive : false,

				barang : {
					barang_id : '',
					barang_satuan : '',
					barang_jumlah : '',
					barang_harga : '',
					barang_total : '',
				}
			}
		},
		methods : {
			formatRupiah : function (val) {
				return formatRupiah(val.toString(), "Rp.");
			},

			triggerNewItem : function(){
				const app = this;
				app.cardInfoActive = false;
				app.cardSuccessActive = true;
				
				this.$emit('newItem', this.barang);
				
				// reset the form
				this.barang = {
					barang_id : '',
					barang_satuan : '',
					barang_jumlah : '',
					barang_harga : '',
					barang_total : ''
				};

				setTimeout(function(){
					app.cardInfoActive = true;
					app.cardSuccessActive = false;
				}, 2000);
			}
		},
		watch : {
			"barang.barang_id" : function(val){
				const app = this;
				if(val != ""){
					startLoading(sweet)
					axios.get(DEFAULT_ENDPOINT + "/master/barang/data/" + app.barang.barang_id)
						 .then(response => {
						 	console.log(response);
						 	app.barang = response.data;
							sweet.close();
					})
				}
			},
		},
		computed : {
			barangNominalTotal : function(){
				return this.barang.barang_jumlah * this.barang.barang_harga;
			}
		}
	}
</script>