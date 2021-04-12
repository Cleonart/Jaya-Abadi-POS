<template>
	<div class="px-10">
		<ComponentForms 
			title="Tambahkan Pelanggan Baru"
			url_get="/master/pelanggan/form"
			url_post="/master/pelanggan/form/post"></ComponentForms>
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