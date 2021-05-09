<template>
	<div class="relative shadow mb-8 py-5 bg-white">
		<div class="w-full px-10 relative">
			<p class="text-2xl font-semibold">{{title}}</p>
			<p class="text-sm text-gray-500 mt-0.5">{{subtitle}}</p>
			<div class="absolute right-10 top-1/2 transform -translate-y-2/4">
				<!-- refresh button -->
				<p @click="refresh()" 
				   class="green-glow-button mr-2">
				   <refresh class="mr-2" :class="refreshAnimation" width="5" height="5"/>Segarkan</p>
				<!-- help button -->
				<p class="blue-glow-button"><questionMarkCircle width="5" height="5"/></p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	import questionMarkCircle from "@/assets/icons/questionMarkCircle.vue";
	import refresh from "@/assets/icons/refresh.vue";
	
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
				// set the animation svg to spin
				app.refreshAnimation = "animate-spin";
				setTimeout(function(){
					// reset the animation class to null
					app.refreshAnimation = "";
				},1000);
				this.$emit('refresh','refresh');
			}
		},
		components : {
			questionMarkCircle,
			refresh
		}
	}
</script>