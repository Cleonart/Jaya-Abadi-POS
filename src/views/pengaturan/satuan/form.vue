<template>
	<div>
		<ComponentForms 
			title="Tambahkan Satuan Baru"
			url_get="/pengaturan/satuan/form"
			url_post="/pengaturan/satuan/form/post"></ComponentForms>
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