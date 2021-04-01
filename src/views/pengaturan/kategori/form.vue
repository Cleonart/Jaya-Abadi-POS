<template>
	<div>
		<ComponentForms 
			title="Tambahkan Kategori Baru"
			url_get="/pengaturan/kategori/form"
			url_post="/pengaturan/kategori/form/post"></ComponentForms>
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