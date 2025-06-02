<template>                 
    <!-- slot is for header & user can add icons using childIcons-->
    <slot :widgetName="widgetName" ></slot>


  <div ref="instance">
    <VitessceWrapper :config="config"></VitessceWrapper>
      <!-- all markup -->
  </div>
</template>
<script setup>

  import { ref, defineEmits, inject, watch, onMounted, onUnmounted } from 'vue';
import VitessceWrapper from '../devComponents/Vitessce/VitessceWrapper.vue';
  defineOptions({
      inheritAttrs: false
  })

  const widgetName = ref('Vitessce Widget');

  // Define your config or accept it as a prop
const config = {
  "version": "1.0.15",
  "name": "HBM485.TBWH.322",
  "description": "Large intestine snATAC-seq HuBMAP dataset with genomic data visualization powered by HiGlass",
  "datasets": [
    {
      "uid": "A",
      "name": "HBM485.TBWH.322",
      "description": "Human large intestine, snATAC-seq",
      "files": [
        {
          "url": "https://data-1.vitessce.io/0.0.33/main/sn-atac-seq-hubmap-2020/human_intestine_2020_hubmap.cells.csv",
          "fileType": "obsEmbedding.csv",
          "coordinationValues": {
            "obsType": "cell",
            "embeddingType": "UMAP"
          },
          "options": {
            "obsIndex": "cell_id",
            "obsEmbedding": [
              "UMAP_1",
              "UMAP_2"
            ]
          }
        },
        {
          "url": "https://data-1.vitessce.io/0.0.33/main/sn-atac-seq-hubmap-2020/human_intestine_2020_hubmap.cells.csv",
          "fileType": "obsSets.csv",
          "coordinationValues": {
            "obsType": "cell"
          },
          "options": {
            "obsIndex": "cell_id",
            "obsSets": [
              {
                "name": "Clusters",
                "column": "cluster"
              }
            ]
          }
        },
        {
          "url": "https://pennsieve-dev-zarr-test-use1.s3.us-east-1.amazonaws.com/ddb6cb43-3749-4e9d-9c59-e2d4a8aa7f5a",
          "fileType": "genomic-profiles.zarr"
        }
      ]
    }
  ],
  "coordinationSpace": {
    "dataset": {
      "A": "A"
    },
    "embeddingType": {
      "A": "UMAP"
    }
  },
  "layout": [
    {
      "component": "scatterplot",
      "coordinationScopes": {
        "dataset": "A",
        "embeddingType": "A"
      },
      "x": 0,
      "y": 6,
      "w": 6,
      "h": 6
    },
    {
      "component": "obsSets",
      "coordinationScopes": {
        "dataset": "A"
      },
      "x": 6,
      "y": 6,
      "w": 6,
      "h": 6
    },
    {
      "component": "genomicProfiles",
      "coordinationScopes": {
        "dataset": "A"
      },
      "x": 0,
      "y": 0,
      "w": 12,
      "h": 6
    }
  ],
  "initStrategy": "auto"
}

</script>
<style scoped lang="scss">
//import SPARC styles if you want to have access to them. 


//example of class styles
.sample-component{
  height:500px;
  width:400px;
  border: solid purple 1px;
  background-color: lightgray;
}
</style>