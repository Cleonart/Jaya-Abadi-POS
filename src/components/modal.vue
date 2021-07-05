<template>
	<div>
		
		<transition name="fade" mode="in-out">
			<div class="backdrop fixed z-50" @click="closeModal()" v-show="modalActive"></div>
		</transition>

		<transition name="slide-fade" mode="in-out">
			<div v-show="modalActive" class="fixed overflow-y-auto max-h-full py-2 bg-white center-h-v rounded z-50" :class="'w-' + width">
				<div class="px-5 my-4">
					<slot name="content"></slot>
				</div>
				<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
					<slot name="button"></slot>
					<button @click="closeModal()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Tutup</button>
					</div>
				</div>
		</transition>

	</div>
</template>

<style type="text/css">
	
	.backdrop{
		@apply fixed right-0 top-0 bg-black opacity-50 h-full w-full;
	}

</style>

<script type="text/javascript">

	export default{
		props : {
			width : {
				type : Number,
				default : 96
			}
		},
		data(){
			return{
				modalActive : false
			}
		},
		methods : {
			
			openModal(){ 
				this.modalActive = true
			},

			closeModal(){ 
				this.modalActive = false
			}
		}
	}
</script>