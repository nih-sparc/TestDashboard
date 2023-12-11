<template>
    <div class="fill sticky">
        <img :src=imgPath>
    </div>
    <div @click="opener.openImageViewer()" class="fill">
        <img :src=imgPath2>
    </div>
    <div @click="opener.openImageViewer()" class="fill">
        <img :src=imgPath3>
    </div>
    <div @click="opener.openImageViewer()"  class="fill">
        <img :src=imgPath2>
    </div>
    <div @click="opener.openImageViewer()"  class="fill">
        <img :src=imgPath3>
    </div>
    <div @click="opener.openImageViewer()"  class="fill">
        <img :src=imgPath2>
    </div>
    <div @click="opener.openImageViewer()"  class="fill">
        <img :src=imgPath3>
    </div>

</template>
<script setup>
    import { ref } from "vue";
  import { useOpenerStore } from "../stores/opener.ts";
  const opener = useOpenerStore();

  const imgPath = ref("./imgs/subInfo.png");
  const imgPath2 = ref("./imgs/imgSel.png");
  const imgPath3 = ref("./imgs/imgSel2.png");
 
</script>
<style>
</style>