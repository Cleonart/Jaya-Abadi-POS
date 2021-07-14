<template>
	<section @mouseenter="enableDropdown()" @mouseleave="disableDropdown()">
		<div v-for="(link,index) in sidebar" :key='index' class="cursor-pointer">

			<!-- Parent Element -->
			<span class="sidebar-item" @click="dropdownOpen(index)">
				<i class="sidebar-item-icon bx" :class="'bx-' + link.icon"></i>
				<span class="sidebar-item-name w-full">{{link.name}}</span>
				<i v-if="!link.link && showDropdownIcon" class="bx bx-chevron-down transition transform text-lg" 
					:class="{'rotate-0' : !link.active, 'rotate-180' : link.active}"></i>
      		</span>

      		<!-- Child Element -->
      		<div v-show="link.child && link.active == true" 
				class="sidebar-item-dropdown-container">
				<p v-for="(child,index) in link.child" :key="index" 
				class="sidebar-item-dropdown-title">
					<a :href="child.link" class="block">
						{{child.name}}
						<i class="sidebar-item-icon -mt-1 absolute right-2 bx bx-chevron-right"></i>
					</a>
				</p>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	
	import 'boxicons/css/boxicons.min.css';

	export default{
		props : ["sidebar"],
		data(){
			return{
				showDropdownIcon : false
			}
		},
		methods : {
			enableDropdown(){
				this.showDropdownIcon = true;
			},

			dropdownOpen(index){
			
				// check if button is link or dropdown
				if(this.sidebar[index].link){
					this.$router.replace("/");
					for(var i = 0; i < this.sidebar.length; i++){
						if(i != index){
							this.sidebar[i].active = false;
						}
					}
					return;
				}

				if(this.sidebar[index].active == false){
					this.sidebar[index].active = true;
					for(var i = 0; i < this.sidebar.length; i++){
						if(i == index){
							continue;
						}
						this.sidebar[i].active = false;
					}
				}
				else{
					this.sidebar[index].active = false;
				}
			},

			disableDropdown(){
				for(var i = 0; i < this.sidebar.length; i++){
					this.sidebar[i].active = false;
				}
				this.showDropdownIcon = false;
			}
		}
	}

</script>

<style scoped>
	
	.sidebar-nav-container{
		@apply relative px-3 flex flex-grow py-2.5 text-white font-semibold text-sm hover:bg-white hover:text-green-500 rounded transition truncate;
	}

	.sidebar-item-icon{
		@apply ml-5 text-xl text-center;
	}

	.sidebar-item-name{
		@apply ml-2 text-sm font-semibold tracking-wide truncate;
	}

	.sidebar-item{
		@apply relative flex flex-row items-center h-11 text-white hover:bg-white hover:text-green-500 rounded pr-6;
	}

	.sidebar-item-dropdown-container{
		@apply py-2 mt-2 mb-2 rounded shadow-lg text-green-500 bg-white w-auto mx-3 truncate;
	}

	.sidebar-item-dropdown-title{
		@apply relative transform transition hover:translate-x-1 hover:text-green-400 font-semibold text-sm px-4 py-1;
	}
</style>