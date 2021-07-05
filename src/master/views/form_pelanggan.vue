<template>
	<div class="bg-gray-50">
		<ComponentForms 
			home="/master/pelanggan"
			title="Tambahkan Pelanggan Baru"
			url_get="/master/pelanggan/form"
			url_post="/master/pelanggan/form"></ComponentForms>
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