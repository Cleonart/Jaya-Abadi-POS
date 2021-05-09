<template>
	<div class="relative flex">
		<div class="w-full md:w-1/2">
			<p class="font-bold text-3xl mt-6 mb-1">{{title}}</p>
			<p class="mb-7 text-gray-600">{{subtitle}}</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ['title', 'subtitle']
	}
</script>