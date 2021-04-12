<template>
	<div class="px-10">
		<ComponentForms 
			title="Tambahkan Barang Baru"
			url_get="/master/barang/form"
			url_post="/master/barang/form/post"></ComponentForms>
	</div>
</template>

<script type="text/javascript">
	
	import ComponentForms from '@/components/form.vue';

	export default{
		components : {
			ComponentForms
		}
	}
</script>