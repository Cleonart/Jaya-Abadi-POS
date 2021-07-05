<template>
	<div>
		<ComponentForms
			home="/master/pengguna"
			title="Kelola Pengguna"
			url_get="/master/pengguna/form"
			url_post="/master/pengguna/form"></ComponentForms>
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