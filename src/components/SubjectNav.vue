<template>
    <slot ></slot>
    <div class="fill">
        <img :src=imgPath>
    </div>
    <div @click="selectSubject('./imgs/subInfo2.png')" class="w-80 fill">
        <img :src=imgPath2>
    </div>
    <div @click="selectSubject('./imgs/subInfo.png')" class="w-80 fill">
        <img :src=imgPath3>
    </div>
    <div @click="selectSubject('./imgs/subInfo2.png')" class="w-80 fill">
        <img :src=imgPath2>
    </div>
    <div @click="selectSubject('./imgs/subInfo.png')" class="w-80 fill">
        <img :src=imgPath3>
    </div>
    <div @click="selectSubject('./imgs/subInfo2.png')" class="w-80 fill">
        <img :src=imgPath2>
    </div>
    <div @click="selectSubject('./imgs/subInfo.png')" class="w-80 fill">
        <img :src=imgPath3>
    </div>
</template>
<script setup>
  import { ref} from "vue";
  import { useOpenerStore } from "../stores/opener";

  const opener = useOpenerStore();

  const emit = defineEmits(['setTitle'])
  emit('setTitle','Navigate by Subject');

  const imgPath = ref("./imgs/filter.png");
  const imgPath2 = ref("./imgs/sub1.png");
  const imgPath3 = ref("./imgs/sub2.png");

function selectSubject(img){
    opener.openWidget("ImageSelector", [{key:"imageSrc",value:img}])

}
</script>
<style scoped lang="scss">


</style>