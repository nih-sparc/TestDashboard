<template>                  
    <slot :widgetName="widgetName"></slot>
    <div v-bind="$attrs" class="flatmap-viewer tw-p-0">
        <div class="tw-text-left tw-pl-1" style="height: 50px;font-size:20px;line-height: 20px;margin: 4px 0 5px 0">
            <p><b>Current Location: </b>{{ locationLabel }}</p>
        </div>

        <FlatmapVuer class="tw-px-2 tw-py-2" uuid="3b9344c0-4d66-5944-9261-e426d8664f7c" :disableUI="disableFlatmapUI" entry="UBERON:0001759" v-on:resource-selected="FlatmapSelected"  v-on:ready="FlatmapReady"/>

    </div>

</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import {FlatmapVuer, MultiFlatmapVuer} from '@abi-software/flatmapvuer';
  import { useOpenerStore } from "../stores/opener";
  import { useLocationStore} from "../stores/locationSelect";
  FlatmapVuer.props.flatmapAPI.default="https://mapcore-demo.org/curation/flatmap/";
    defineOptions({
        inheritAttrs: false
    })
  const props = defineProps({
    listening:{
            tyep:Boolean
    }
  })

  const disableFlatmapUI = true;
  let FlatmapReady = false;

  const locationStore = useLocationStore();
  locationStore.init()

  const widgetName = ref('Flatmap Selector');

  const emitter = inject('emitter');
  
  let locationId = "";
  const locationLabel = ref("None selected");
  
function FlatmapSelected(data){
    locationLabel.value = data.label;
    if(!data.feature.location || locationId===data.feature.location){return;}
    locationId = data.feature.location;
    const locationMinMax = tempMapToMinMax(locationId);
    //send to image selector
    emitter.emit("FlatmapViewer-anatomicalLocationSelected",locationMinMax)
}
//this function is my temp work around to not having the map return anything useful
function tempMapToMinMax(id){
    return{
            min:id-.1,
            max:id+.1
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