<template>
	<div>
		<p class="mb-1.5 mt-0 text-gray-800 text-sm">{{label}}<span v-if="required" class="text-red-500">*</span></p>
		<input class="border w-full col-span-5 py-3 px-3 rounded-md bg-transparent" 
		       type="date"
		       v-model="local_value">
		<p v-if="footnote" class="text-xs mt-2" v-html="footnote"/>
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ['value', 'label', 'disabled', 'required', 'footnote'],
		data(){
			return{
				local_value : "",
			}
		},
		watch : {
			local_value : function(){
				this.$emit('model', this.local_value);
			},
			value : function(val){
				this.local_value = val 
			}
		},
	}
</script>