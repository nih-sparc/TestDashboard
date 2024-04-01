<template>
<div class="flatmap-viewer">
    <div class="text-left pl-1"><p>select anatomical location</p></div>

    <FlatmapVuer class="px-2 py-2" disableUI="true" entry="UBERON:1759" v-on:resource-selected="FlatmapSelected"  v-on:ready="FlatmapReady"/>

</div>

</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import {FlatmapVuer, MultiFlatmapVuer} from '@abi-software/flatmapvuer';
  import { useOpenerStore } from "../stores/opener";
  FlatmapVuer.props.flatmapAPI.default="https://mapcore-demo.org/devel/flatmap/v4/";

  const emit = defineEmits(['setName']);
  emit('setName','New Custom Component!'); 

  const emitter = inject('emitter');
  let Location ="";
  
function FlatmapSelected(data){
    Location = data.feature.featureId;
    //send to image selector
    emitter.emit("anatomical-location-selected",353)
}



</script>
<style scoped lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';
    .flatmap-viewer{
        :deep(.flatmap-container){
            width: 100%;
            height: 90%;
        }
        p{
            color: $mediumGrey;
            font-size: 14px;
        }
    }
    .open-image{
        color:#8300BF;
    }

</style>