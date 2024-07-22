<template>
            <div ref="instance" class="grid-stack-item-content" @click="selectWidget()">
                <component class="widget-body" v-slot="slotProps" :is="componentTag" :listening="highlight">
             
                    <DashHeader :widgetName="slotProps.widgetName" :staticMode="staticMode">
                        <component class="tw-p-1" v-for="icon in slotProps.childIcons" :is="icon.comp" @click="icon.event" ></component>
                        <DownloadIcon></DownloadIcon>
                        <close-icon v-if="!staticMode" background="#8300BF" color="white" class="close-button" @click="$emit('removeWidget')"></close-icon>
                    </DashHeader>
                </component> 
            </div>
</template>
<script setup>
    import CloseIcon from './icons/CloseIcon.vue';
    import DownloadIcon from './icons/DownloadIcon.vue'
    import { ref, inject, computed, watch, provide} from 'vue';
    import { useOpenerStore } from "../stores/opener";
    import DashHeader from "./DashHeader.vue";

    const emit = defineEmits(['removeWidget']);
    const opener = useOpenerStore();
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
                
            }
        })
    //this controls properties of a widget being dynamically opened from another widget (via the spacdashboard).
    //use case for this might not be needed anymore as we use edit mode and static mode to add widgets. 
    let propName = ref("");
    let propVal = ref("");
    watch(() => props.componentProperties, (newVal, oldVal) => {
        for(let [key,val] of newVal){
        propName=key
        propVal = val;
    }})

//-----------------------------------------------------------------------------
    let instance = ref(null);
    let highlight = ref(false)
    

    function selectWidget(){
        if(opener.selectibleWidgets.indexOf(props.widgetID.split("-")[0])>-1){
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
:deep(.widget-body){
  height: calc( 100% - 40px );
}
.grid-stack-item-content {
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
:deep(.stick-to-top){
    position: sticky;
    top: 0;
    width: 100%;
}
.focus-from-Img-View{
        border:solid $lightPurple 2px !important;
    }
</style>