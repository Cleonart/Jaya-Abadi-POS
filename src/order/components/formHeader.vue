<template>
	<div class="px-10 relative shadow-md py-6">
		<p class="text-2xl font-bold">{{title}}</p>
		<p class="text-sm text-gray-500">{{subtitle}}</p>
		<p class="font-bold text-xl mt-1 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-3/4">Total {{total}}</p>
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ['title','subtitle','total']
	}
</script>
