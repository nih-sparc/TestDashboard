<template>
    <div
    v-if="!hideHeader" 
    class="content-header stick-to-top tw-flex tw-flex-row tw-items-center tw-justify-between tw-h-10">                    
      <div>
        <div class="tw-m-4 tw-leading-none tw-pl-1 widget-name">{{ widgetName }}</div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
    <div v-else
      class="tw-absolute content-header tw-flex-row-reverse tw-flex tw-w-100 tw-items-center tw-justify-between tw-h-10">
      <slot></slot>
    </div>
</template>
<script setup>
//this component really only has one job, and it's to format the header correctly and make it easier for users to add icons to the header without much markup on their end.
//alternative markup that would be needed on all children >
//  <div v-bind="$attrs">                    
//       <slot name="title" :widgetName="widgetName"></slot>
//       <div>
//         <GraphIcon class="tw-p-1" @click="settingsVisible=true"></GraphIcon>
//         <slot></slot>
//       </div>
//     </div> 

const props = defineProps({      
    widgetName:{
        type:String,
        required:true
    },
    hideHeader:Boolean
})

</script>
<style scoped lang="scss">


.stick-to-top{
position: sticky;
top: 0;
width: 100%;
}

</style>