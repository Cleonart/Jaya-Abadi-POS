<template>
	<div class="relative shadow mb-8 py-5 bg-white">
		<div class="w-full px-10 relative">
			<p class="text-2xl font-semibold">{{title}}</p>
			<p class="text-sm text-gray-500 mt-0.5">{{subtitle}}</p>
			<div class="absolute right-10 top-1/2 transform -translate-y-2/4">
				<p @click="refresh()" class="font-bold bg-green-100 px-4 py-2 transition hover:bg-gray-900 hover:text-white cursor-pointer rounded-md text-green-600">
					<svg class="h-5 w-5 mr-1 inline-block" :class="refreshAnimation" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Segarkan</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				refreshAnimation: ""
			}
		},
		props : ['title', 'subtitle'],
		methods : {
			refresh : function(){
				const app = this;
				app.refreshAnimation = "animate-spin";
				setTimeout(function(){
					app.refreshAnimation = "";
				},500);
				this.$emit('refresh','refresh');
			}
		}
	}
</script>