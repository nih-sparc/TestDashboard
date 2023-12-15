<template>
    <div class="fill sticky">
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
  import { ref, inject} from "vue";
  const emitter = inject('emitter');

  const name = "SubjectNav"
  const imgPath = ref("./imgs/filter.png");
  const imgPath2 = ref("./imgs/sub1.png");
  const imgPath3 = ref("./imgs/sub2.png");

function selectSubject(img){
    emitter.emit('selectSubject', img);
}
</script>
<style scoped lang="scss">
    .w-80 img{
        width:80% !important;;
    }

</style>