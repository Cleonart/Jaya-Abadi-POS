<template>
	<div>
		<p class="mb-1.5 mt-0 text-gray-800 text-sm">{{label}}<span v-if="required" class="text-red-500">*</span></p>
		<input class="border w-full col-span-5 py-3 px-3 rounded-md bg-transparent" 
		       type="date" 
		       v-model="local_value">
		<!-- Version 1
		<div class="grid grid-cols-12 gap-2">
			
			Date
			<select :disabled="disabled" 
					v-model="date" 
					class="border col-span-3 py-3 px-3 rounded-md bg-transparent">
				<option v-for="n in 31" :value="n">{{n}}</option>
			</select>

			Month
			<select :disabled="disabled"
					v-model="month" 
					class="border col-span-5 py-3 px-3 rounded-md bg-transparent">
				<option v-for="(month,index) in months" :value="index + 1">{{month}}</option>
			</select>

			Year
			<select :disabled="disabled"
					v-model="year" 
					class="border col-span-4 py-3 px-3 rounded-md bg-transparent">
				<option v-for="n in 100 ">{{n + 1999}}</option>
			</select>
			
		</div>-->
		<p v-if="footnote" class="text-xs mt-2" v-html="footnote"/>
		
	</div>
</template>

<script type="text/javascript">
	export default{
		props : ['value', 'label', 'disabled', 'required', 'footnote'],
		data(){
			return{
				local_value : "",
				
				/*
				date : 1,
				month : 4,
				year : 2001,

				months : ["Januari", "Februari", "Maret", "April", "Mei", 
						  "Juni", "Juli", "Agustus", "September", 
						  "Oktober", "November", "Desember"],*/
			}
		},
		methods : {
			tes : function(){
				alert("tes");
			}
		},
		watch : {
			local_value : function(){
				this.$emit('model', this.local_value);
			}
			/*
			date : function(){
				this.$emit('model', this.date + "/" + this.month + "/" + this.year);
			},
			month : function(){
				this.$emit('model', this.date + "/" + this.month + "/" + this.year);	
			},
			year : function(){
				this.$emit('model', this.date + "/" + this.month + "/" + this.year);
			}*/
		},
		mounted(){
			if(this.value != ""){
				this.local_value = this.value;
				/*
				var check_data = this.value.split("/");
				this.date  = check_data[0];
				this.month = check_data[1];
				this.year  = check_data[2];*/
			}
			
		}
	}
</script>