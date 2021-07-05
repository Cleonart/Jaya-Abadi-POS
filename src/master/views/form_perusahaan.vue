<template>
	<div>
		<ComponentForms
			home="/"
			title="Kelola Data Perusahaan"
			url_get="/master/perusahaan/form"
			url_post="/master/perusahaan/form"></ComponentForms>
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