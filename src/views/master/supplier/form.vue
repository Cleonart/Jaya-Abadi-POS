<template>
	<div class="bg-gray-50">
		<ComponentForms 
			home="/master/supplier"
			title="Tambahkan Supplier Baru"
			url_get="/master/supplier/form"
			url_post="/master/supplier/form/post"></ComponentForms>
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