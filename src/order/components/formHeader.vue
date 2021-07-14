<template>
	<div class="header-container">
		<h1 class="header-title">{{title}}</h1>
		<p class="header-subtitle">{{subtitle}}</p>
		<p class="header-title-total">Total {{total}}</p>
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ['title','subtitle','total']
	}
</script>

<style type="text/css" scoped>
	
	.header-container{
		@apply px-10 relative shadow-md py-6;
	}

	.header-title{
		@apply text-2xl font-bold;
	}

	.header-subtitle{
		@apply text-sm text-gray-500;
	}

	.header-title-total{
		@apply 	font-bold text-xl mt-1
				md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-3/4;
	}

</style>