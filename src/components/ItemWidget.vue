<template>
    <header>  
 
            <h3>{{ widgetName }}</h3>
            <close class="close-button" @click="$emit('removeWidget')"></close>

    </header>
            <div class="grid-stack-item-content py-16">
                <slot></slot>
            </div>
</template>
<script setup>
import Close from './icons/Close.vue';

const emit = defineEmits(['removeWidget']);

const props = defineProps({
        widgetName:{
            type:String,
            required:true
        }
    })
</script>
<style scoped lang="scss">
header{
    justify-content: space-between;
    align-items: center;
    display:flex;
    flex-flow:row;

    h3{
        margin:10px;
    }
    .close-button{
        cursor: pointer;
        padding:10px;
        width:20px;
        height: 20px;
    }
}

.grid-stack-item-content {
    position: relative !important;
    inset:0 !important;
    text-align: center;
}
:deep(.fill) {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
    flex-shrink: 1;
    width:100%;
    }
}
</style>