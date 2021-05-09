<template>
	<div class="mb-2">
		<span class="block mb-1.5 mt-0 text-gray-400 text-xs font-bold pb-2">CARI BARANG</span>
		<span class="relative border rounded-md py-3 pl-3">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
			<input type="text" v-model="value" class="text-sm pl-2 w-full md:w-56 " :placeholder="placeholder">
		</span>
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ["value", "placeholder"],
		computed : {
			set(){
				this.$emit('input', this.value);
			}
		}
	}
</script>