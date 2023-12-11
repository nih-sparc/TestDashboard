<template>
    <div class="fill sticky">
        <img :src=imgPath>
    </div>
    <div @click="opener.imageSelectorOpen=true" class="fill">
        <img :src=imgPath2>
    </div>
    <div @click="opener.imageSelectorOpen=true" class="fill">
        <img :src=imgPath3>
    </div>
    <div @click="opener.imageSelectorOpen=true" class="fill">
        <img :src=imgPath2>
    </div>
    <div @click="opener.imageSelectorOpen=true" class="fill">
        <img :src=imgPath3>
    </div>
    <div @click="opener.imageSelectorOpen=true" class="fill">
        <img :src=imgPath2>
    </div>
    <div @click="opener.imageSelectorOpen=true" class="fill">
        <img :src=imgPath3>
    </div>
</template>
<script setup>
  import { ref} from "vue";
  import { useOpenerStore } from "../stores/opener.ts";
  
  const opener = useOpenerStore();
  const imgPath = ref("./imgs/filters.png");
  const imgPath2 = ref("./imgs/sub1.png");
  const imgPath3 = ref("./imgs/sub2.png");

</script>
<style scoped lang="scss">


</style>