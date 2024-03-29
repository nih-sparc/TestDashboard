<template>

        <!-- <div class="flatmap-viewer h-4/6 flex justify-center mb-1"> -->
            <FlatmapVuer disableUI="true" entry="UBERON:1759" v-on:resource-selected="FlatmapSelected"  v-on:ready="FlatmapReady"/>



</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import {FlatmapVuer, MultiFlatmapVuer} from '@abi-software/flatmapvuer';
  import { useOpenerStore } from "../stores/opener";
  FlatmapVuer.props.flatmapAPI.default="https://mapcore-demo.org/devel/flatmap/v4/";

  const emitter = inject('emitter');
  const opener = useOpenerStore();

  const baseUrl = './imgs/'

  let Location ="";
  
function FlatmapSelected(data){
    Location = data.feature.featureId;
    //send to image selector
    emitter.emit("anatomical-location-selected",353)
}



</script>
<style scoped lang="scss">
    .flatmap-viewer{
        :deep(.flatmap-container){
            width: 100%;
        }
    }
    .open-image{
        color:#8300BF;
    }

</style>