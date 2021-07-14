<template>
	<div>
		<p class="mb-1.5 mt-0 text-gray-800 text-sm">{{label}}<span v-if="required" class="text-red-500">*</span></p>
		<input 	v-model="value" 
				:title="value"
				class="border w-full py-3 px-3 rounded-md" 
				type="text" 
				:disabled="disabled" 
				:required="required" 
				:placeholder="placeholder">
		<p v-if="footnote" class="text-xs mt-2" v-html="footnote"/>
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ['value', 'label', 'placeholder', 'disabled', 'required', 'footnote'],
		computed : {
			set(){
				this.$emit('input', this.value);
			}
			
		}
	}
</script>