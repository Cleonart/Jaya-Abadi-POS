<template>
	<div>
		<ComponentForms
			home="/master/supplier"
			title="Kelola Supplier"
			url_get="/master/supplier/form"
			url_post="/master/supplier/form"></ComponentForms>
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