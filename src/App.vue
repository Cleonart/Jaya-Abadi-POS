<template>
  <router-view></router-view>
</template>

<style type="text/css">

input:focus, textarea:focus, select:focus{
  outline: none;
}

.pointer{
  cursor: pointer;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>

<script>
import Sidebar from "@/modules/sidebar.vue";
import Footer from "@/modules/footer.vue";

export default {
  data(){
    return{
      color : {
        primary : "#43c079"
      },
    }
  },
  components : {
    Sidebar,
    Footer
  }
}

</script>

