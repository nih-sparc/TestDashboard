<template>
<div class="flatmap-viewer">
    <div class="tw-text-left tw-pl-1"><p>select anatomical location</p></div>

    <FlatmapVuer class="tw-px-2 tw-py-2" :disableUI="disableFlatmapUI" entry="UBERON:1759" v-on:resource-selected="FlatmapSelected"  v-on:ready="FlatmapReady"/>

</div>

</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import {FlatmapVuer, MultiFlatmapVuer} from '@abi-software/flatmapvuer';
  import { useOpenerStore } from "../stores/opener";
  FlatmapVuer.props.flatmapAPI.default="https://mapcore-demo.org/devel/flatmap/v4/";
  const disableFlatmapUI = true;

  const emit = defineEmits(['setTitle']);
  emit('setTitle','Flatmap Vagus Selector'); 

  const emitter = inject('emitter');
  let Location ="";
  
function FlatmapSelected(data){
    Location = data.feature.featureId;
    //send to image selector
    emitter.emit("anatomical-location-selected",353)
}



</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';
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