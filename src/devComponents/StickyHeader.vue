<template>
    <div ref="headerRef">
        <slot></slot>
    </div>
</template>
<script setup>

    import { ref, onMounted } from 'vue';

    const headerRef = ref(null);
    const props = defineProps(['containerRef']);
    let content = null;
    let sticky = null;
onMounted(()=>{
    content =  headerRef.value.parentElement.querySelector("."+props.containerRef) || headerRef.value.parentElement;
    content.onscroll = function(){handleScroll();}
    sticky = headerRef.value.offsetTop;

})




//.onscroll = function() {handleScroll()};


function handleScroll() {
  if (headerRef.value.getBoundingClientRect().top < 0) {
    headerRef.value.classList.add("sticky-header");
  } else {
    headerRef.value.classList.remove("sticky-header");
  }
}
    

</script>
<style lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';

.sticky-header {

}

.sticky-header {
  position: sticky;
  top: 0;
  width: 100%;
  background:white;
}

// .sticky-header + .content {
//   padding-top: 102px;
// }
</style>