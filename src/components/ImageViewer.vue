<template>
    <div class="content-header stick-to-top tw-flex tw-flex-row tw-items-center tw-justify-between tw-h-10 tw-p-1">                    
      <slot></slot>
    </div>
    <div class="metadata-imgV">

    </div>
    <div ref="instance" class="viewer-img">
        <img :src=props.imageSrc> 
    </div>
</template>
<script setup>

    import { ref, defineEmits, inject, watch, onMounted, onUnmounted } from 'vue';
    //import { useOpenerStore } from '../stores/opener';

    const emitter = inject('emitter');
    //const opener = useOpenerStore();

    const props = defineProps({
        title:{
                type:String,
                required:true
            },  
        imageSrc:{
            type:String
        },
        listening:{
            tyep:Boolean
        }
    })

    const listening = ref(false);

    
    const emit = defineEmits(['setTitle']);
    emit('setTitle','MUSE Image Viewer');

    //uses widgetID to specify own wrapper
    watch(() => props.listening, (newVal, oldVal) => {
           //emitter.emit('select-widget'+props.widgetID, newVal);
    });

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';
    .viewer-img{
        display: flex;
        height: 100%;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .highlight{
        border: solid $lightPurple 2px;
    }
.metadata-imgV{
    text-align: left;
    margin-left:6px;
    margin:0;
        line-height: 1rem !important;
    p{
        margin:0 !important;
    }
}
</style>
<style lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

</style>