<template>
    <div class="fill sticky">
        <img :src=imgPath>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    const imgPath = ref("./imgs/img.png");
    
</script>
<style>
</style>