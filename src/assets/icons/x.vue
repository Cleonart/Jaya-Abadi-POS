<template>
	<svg class="h-5 w-5 inline-block" 
		 :class="'w-' + width + ' h-' + height" 
		 fill="none" 
		 viewBox="0 0 24 24" 
		 stroke="currentColor">
		 <path stroke-linecap="round" 
		 	   stroke-linejoin="round" 
		 	   stroke-width="2" 
		 	   d="M6 18L18 6M6 6l12 12"/>
	</svg>
</template>

<script type="text/javascript">
	export default{
		props : ["width", "height"]
	}
</script>