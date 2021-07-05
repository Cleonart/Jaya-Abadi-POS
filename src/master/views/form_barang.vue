<template>
	<div>
		<ComponentForms
			home="/master/barang"
			title="Tambahkan Barang Baru"
			url_get="/master/barang/form"
			url_post="/master/barang/form"></ComponentForms>
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