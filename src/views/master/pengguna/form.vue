<template>
	<div>
		<ComponentForms 
			title="Tambahkan Pengguna Baru"
			url_get="/master/pengguna/form"
			url_post="/master/pengguna/form/post"></ComponentForms>
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