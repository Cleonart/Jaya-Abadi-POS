<template>
	<div class="relative shadow mb-8 py-5 bg-white">
		<div class="w-full px-10 relative">
			<p class="text-2xl font-semibold">{{title}}</p>
			<p class="text-sm text-gray-500 mt-0.5">{{subtitle}}</p>
			<div class="absolute right-10 top-1/2 transform -translate-y-2/4">

				<!-- refresh button -->
				<p @click="refresh()" 
				   class="green-glow-button mr-2">
				   <refresh class="mr-2" :class="refreshAnimation"/>Segarkan</p>
				
				<!-- add new button -->
				<p @click="directTo()" 
				   class="green-glow-button mr-2">
				   <plus class="mr-2"/>Order Baru</p>
				
				<!-- help button -->
				<p class="blue-glow-button"><questionMarkCircle/></p>

			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import questionMarkCircle from "@/assets/icons/questionMarkCircle.vue";
	import refresh from "@/assets/icons/refresh.vue";
	import plus from "@/assets/icons/plus.vue";

	export default{
		components : {questionMarkCircle, refresh, plus},
		props : ["title", "subtitle", 'route'],
		data(){
			return{
				refreshAnimation : ""
			}
		},
		methods : {

			directTo : function(){
				this.$router.replace(this.route);
			},

			refresh : function(){
				const app = this;
				app.refreshAnimation = "animate-spin";
				setTimeout(function(){
					app.refreshAnimation = "";
				}, 500);
				this.$emit('refresh','refresh');
			}
		}
	}
</script>