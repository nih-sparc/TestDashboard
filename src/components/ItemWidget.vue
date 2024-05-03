<template>
            <div ref="instance" class="grid-stack-item-content" @click="selectWidget()">

                <div class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-h-10 content-header stick-to-top tw-p-1">
                    <h3>{{ widgetTitle}}</h3>
                    <close v-if="!staticMode" background="#8300BF" color="white" class="close-button" @click="$emit('removeWidget')"></close>
                </div>
                <component class="widget-body" @setTitle="(t)=>updateTitle(t)" :is="componentTag" :listening="highlight">
              </component>
            </div>
</template>
<script setup>
    import Close from './icons/Close.vue';
    import { ref, inject, computed, watch} from 'vue';
    import { useOpenerStore } from "../stores/opener";

    const emitter = inject('emitter');

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



        //this controls properties of a widget being dynamically opened from another widget.
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

    let widgetTitle = ref("");
    function updateTitle(t){
        widgetTitle.value = t;
    }

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

.content-header{
    border-bottom: 1px solid $mediumGrey;
    
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
.widget-body{
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
.stick-to-top{
    position: sticky;
    top: 0;
    width: 100%;
}
.focus-from-Img-View{
        border:solid $lightPurple 2px !important;
    }
</style>