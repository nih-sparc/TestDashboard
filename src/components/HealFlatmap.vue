<template>                  
    <slot :widgetName="widgetName"></slot>
    <div id="map-container"></div>

</template>
<script setup>
  import { ref, onMounted} from "vue";
  import {MapViewer} from '@abi-software/flatmap-viewer'

defineOptions({
        inheritAttrs: false
    })
const widgetName = "Heal Flatmap"
// Use production SPARC maps

const MAP_SERVER = ref('https://mapcore-demo.org/current/flatmap/v3/')

onMounted(async()=>{
    // Create a viewer for the map server

    const viewer = new MapViewer(MAP_SERVER.value)

    // Optionally get a list of all maps on the server

    const mapList = await viewer.allMaps()
    console.log(mapList)

    // Load the most recent human female map into the `map-container`
    // with all paths hidden. The provided callbacke will log all events
    // from the viewer to the console.

    const map = await viewer.loadMap({
        taxon: 'NCBITaxon:9606',
        biologicalSex: 'PATO:0000383'
    }, (type, data) => {
        console.log(type, data)
    }, {
    container: 'map-container',
    pathsDisabled: true
    })
})

</script>
<style>
/* this cannot be scoped while still working as designed. Style leak exists reardless of this line */
        /* @import "@abi-software/flatmapvuer/dist/style.css"; */
</style>
<style scoped lang="scss">
@import "../assets/vars.scss";

#map-container{
    border: 3px solid green;
    height: 100%;
    width: 100%;
}

</style>