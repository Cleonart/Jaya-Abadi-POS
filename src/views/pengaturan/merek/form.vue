<template>
	<div>
		<ComponentForms 
			title="Tambahkan Merek Baru"
			url_get="/pengaturan/merek/form"
			url_post="/pengaturan/merek/form/post"></ComponentForms>
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