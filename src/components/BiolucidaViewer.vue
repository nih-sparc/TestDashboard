<template>
          
    <slot :widgetName="widgetName"></slot>
    
    <div v-bind="$attrs"  class="tw-flex tw-flex-col tw-h-full">
        <div class="bv-metadata tw-text-left tw-p-1 tw-text-sm">
        </div>
        <div class="tw-h-screen tw-flex tw-justify-center">
            <iframe class="tw-p-1 tw-w-screen" :src="shareLink" ></iframe>
        </div>
    </div>
</template>
<script setup>
  import {ref, onMounted, onUnmounted, inject,watch} from "vue";
  import { useOpenerStore } from "../stores/opener";
  import {useGlobalVarsStore} from "../stores/globalVars"

  const widgetName = ref('MBF Image Viewer');
  const emit = defineEmits(['selectWidget']);

  const props = defineProps({
    imageID:0,
    listening:{
            tyep:Boolean
    }
  })

  const emitter = inject('emitter');

  const GlobalVars = useGlobalVarsStore();
    const shareLink = ref("");
  watch(() => GlobalVars.MBF_SHARE_LINK, (newVal, oldVal) => {
        shareLink.value = newVal;
        console.log(shareLink.value)
})

  const opener = useOpenerStore();

  onMounted(() => {
    opener.mbfViewerCount++;
  });
  onUnmounted(()=>{
    opener.mbfViewerCount--;
  })
    emitter.on('ImageSelector-mbfImageSelected',(img)=>{
        if(opener.mbfViewerCount>1 && props.listening || opener.mbfViewerCount==1){
            mbfURLSrc.value=img;
        }
    });

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';
.bv-metadata{
    padding-left:10px;
    span{
        font-weight: bold;
    }
}
.hightlight{
        border:solid $lightPurple 2px !important;
    }
    iframe{padding:0; border:none;}
</style>