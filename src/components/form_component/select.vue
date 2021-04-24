<template>
	<div @mouseleave="stats = false" >
		
		<div class="w-full" @click="stats = true">
			<p class="mb-1.5 mt-0 text-gray-800 text-sm">{{label}}<span v-if="required" class="text-red-500">*</span></p>
			<div class="border w-full py-3.5 rounded-md bg-transparent">
				<p class="px-3">
					<span v-if="item != ''">{{options[item.toString()]}}</span>
					<span v-else class="text-gray-500">{{placeholder}}</span>
				</p>
				<div v-if="stats == true" class="relative mx-3">
					<input type="text" class="border mb-1 py-2 w-full mt-2 px-3 bg-gray-100 rounded-md bg-transparent" placeholder="Cari Disini.." v-model="search_bar" >
					<span v-for="(option,index) in options">
					  <p v-if="option.toLowerCase().includes(search_bar)" 
					  	 @click="selectItem(index)" 
					     class="cursor-pointer -mx-3 px-3 hover:bg-blue-400 mt-1 py-1">{{option}}</p>
					 </span>
				</div>
			</div>
		</div>
		<p v-if="footnote" class="text-xs mt-2" v-html="footnote"/>
	</div>
</template>

<script type="text/javascript">
	
	export default{
		props : ['value', 'label', 'placeholder', 'disabled', 'options', 'required', 'footnote'],
		data(){
			return{
				item  : "",
				search_bar : "",
				stats : false
			}
		},
		methods : {
			selectItem : function(option){
				this.item = option;
				this.$emit('model', option);
			}
		},
		watch : {
			value : function(){
				this.item = this.value;
			}
		},
		created(){
			if (this.value != "") { 
				this.item = this.value;
			}
		}
	}
</script>