<template>
<div class="flatmap-viewer tw-p-0">
    <div class="tw-text-left tw-pl-1">
        <p><b>Current Location: </b>{{ locationLabel }}</p>
    </div>

    <FlatmapVuer class="tw-px-2 tw-py-2" :disableUI="disableFlatmapUI" entry="UBERON:1759" v-on:resource-selected="FlatmapSelected"  v-on:ready="FlatmapReady"/>

</div>

</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import {FlatmapVuer, MultiFlatmapVuer} from '@abi-software/flatmapvuer';
  import { useOpenerStore } from "../stores/opener";
  import { useLocationStore} from "../stores/locationSelect";
  FlatmapVuer.props.flatmapAPI.default="https://mapcore-demo.org/devel/flatmap/v4/";
  const disableFlatmapUI = true;
  let FlatmapReady = false;

  const locationStore = useLocationStore();
  locationStore.init()

  const emit = defineEmits(['setTitle']);
  emit('setTitle','Flatmap Selector'); 

  const emitter = inject('emitter');
  
  let locationId = "";
  const locationLabel = ref("None selected");
  
function FlatmapSelected(data){
    if(locationId===data.feature.featureId){return;}
    locationId = data.feature.featureId;
    locationLabel.value = data.label;
    const locationMinMax = tempMapToMinMax(locationId);
    //send to image selector
    emitter.emit("anatomical-location-selected",locationMinMax)
}
//this function is my temp work around to not having the map return anything useful
function tempMapToMinMax(id){
    switch(id) {
            case 3:
                return {
                    min: 0.0,
                    max: 0.1
                }
            case 6:
                return {
                    min: 0.1,
                    max: 0.2
                }
            case 11:
                return {
                    min: 0.2,
                    max: 0.3
                }
            case 11:
                return {
                    min: 0.3,
                    max: 0.4
                }
            case 14:
                return {
                    min: 0.4,
                    max: 0.5
                }
            case 50:
                return {
                    min: 0.5,
                    max: 0.7
                }
            default:
                return {
                    min:0.7,
                    max:0.8
                };
        }
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