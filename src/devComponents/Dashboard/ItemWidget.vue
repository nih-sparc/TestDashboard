<template>
            <div ref="instance" class="grid-stack-item-content" @click="selectWidget()">
                <component 
                v-slot="slotProps" 
                class="widget-body" 
                :widgetID="widgetID"
                :is="componentTag" 
                :listening="highlight" 
                @remove-header="(h)=>updateHideHeader(h)" 
                v-bind="props.componentProperties">
                    <DashHeader 
                    v-if="slotProps" 
                    :widgetName="props.componentName|| slotProps.widgetName" 
                    :staticMode="staticMode"
                    :hideHeader="hideHeader">
                        <div
                        class="tw-flex">
                            <el-tooltip 
                            placement="bottom-start"
                            v-for="icon in slotProps.childIcons">
                                <template #content>{{ icon.tooltip }}</template>
                                    <component class="tw-p-1 tw-w-5"  
                                    :is="icon.comp" 
                                    @click="icon.event">
                                </component>
                            </el-tooltip>
                            <div
                            class="tw-flex"
                            v-if="!staticMode" >
                                <close-icon 
                                background="#8300BF" 
                                color="white" 
                                class="item-widget-button"
                                @click="$emit('removeWidget')">
                                </close-icon>
                            </div>
                        </div>
                    </DashHeader>
                </component> 
            </div>
</template>
<script setup>
    import CloseIcon from '../../components/icons/CloseIcon.vue';
    import DownloadIcon from '../../components/icons/DownloadIcon.vue'
    import { ref} from 'vue';
    import { useGlobalVarsStore } from '../../stores/globalVars';
    import DashHeader from "./DashHeader.vue";
    import { nextTick } from 'process';
    import { ElTooltip } from 'element-plus';
    
    const emit = defineEmits(['removeWidget']);
    const GlobalVars = useGlobalVarsStore();
    const props = defineProps({      
            widgetID:{
                type:String,
                required:true
            },
            staticMode:{
                type:Boolean,
                required:true
            },
            componentTag:{
                required:true
            },
            componentProperties:{
                type:Object
            },
            componentName:{
                type:String
            }
        })

    const hideHeader = ref(false);
    function updateHideHeader(hideIt){
        hideHeader.value=hideIt;
    }

    
//-----------------------------------------------------------------------------
// hightlight functionslity
    let instance = ref(null);
    let highlight = ref(false)
    
    function selectWidget(){
        if(GlobalVars.selectibleWidgets.indexOf(props.widgetID.split("-")[0])>-1){
            highlight.value=!highlight.value;
            instance.value.classList.toggle("focus-from-Img-View");
        }
    }

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

:deep(.content-header){
    border-bottom: 1px solid $mediumGrey;
    overflow: hidden;
    min-height: 40px;
    h3{
        margin:10px;
    }
    .item-widget-button{
        cursor: pointer;
        margin-right:3px;
        width:20px;
        height: 20px;
        padding:8px;
    }
}
:deep(.widget-body){
  height: calc( 100% - 40px );
}
.grid-stack-item-content {
    overflow:hidden;
    border: 1px solid $lightGrey;
    border-radius: 0.2rem;
    text-align: center;
    background-color: #ebedf0;
    display: flex;
    flex-flow: column;
}
:deep(.fill) {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
    flex-shrink: 1;
    width:100%;
    }
}
.focus-from-Img-View{
        border:solid $lightPurple 2px !important;
    }
.icon-wrapper{
    width:25px
}
</style>