<template>
	<div>
		<div class="w-full">
			<p class="form-label">{{label}}<span v-if="required" class="text-red-500">*</span></p>
			<div @click="openSelect()" @mouseleave="stats = false" 
				 class="border w-full py-3.5 rounded-md bg-transparent cursor-pointer"
				 :class="{'text-black bg-gray-100': disabled}">
				<p class="px-3 relative">
					<span v-if="item != ''">{{options[item.toString()]}}</span>
					<span v-else class="text-gray-500">{{placeholder}}</span>
					<svg class="w-4 absolute right-3 top-1/2  transform -translate-y-2/4 transition transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{'rotate-0' : !stats, 'rotate-180' : stats}">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</p>
				<div v-if="stats == true" class="relative mx-3">
					<input type="text" class="border mb-1 py-2 w-full mt-2 px-3 bg-gray-100 rounded-md bg-transparent" placeholder="Cari Disini.." v-model="search_bar" >
					<span v-for="(option,index) in options">
					  <p v-if="option.toLowerCase().includes(search_bar)" 
					  	 @click="selectItem(index)" 
					     class="cursor-pointer -mx-3 px-3 text-sm hover:bg-blue-400 mt-1 py-1">{{option}}</p>
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
			
			openSelect : function(){
				if(!(this.disabled)){
					this.stats = true;
				}
			},

			selectItem : function(option){
				const app = this;
				app.item = option;
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