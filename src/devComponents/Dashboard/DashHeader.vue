<template>
    <div
    v-if="!hideHeader" 
    class="content-header stick-to-top tw-flex tw-flex-row tw-items-center tw-justify-between tw-h-10 tw-p-1">                    
      <div>
        <h3>{{ widgetName }}</h3>
      </div>
      <div>
        <slot></slot>
      </div>
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
import { ref, inject, computed, watch, provide} from 'vue';
const props = defineProps({      
    widgetName:{
        type:String,
        required:true
    },
    hideHeader:Boolean
})

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

.content-header{
    border-bottom: 1px solid $mediumGrey;
    background-color: #ebedf0;
    z-index: 3;
    h3{
        margin:10px;
    }
    .close-button{
        cursor: pointer;
        margin-right:3px;
        width:20px;
        height: 20px;
        padding:8px;
    }
}

.stick-to-top{
position: sticky;
top: 0;
width: 100%;
}

</style>