<template>
            <div ref="instance" class="grid-stack-item-content">

                <div class="flex flex-row items-center justify-between h-10 content-header stick-to-top p-1">
                    <slot name="title"></slot>
                    <close v-if="!staticMode" background="#8300BF" color="white" class="close-button" @click="$emit('removeWidget')"></close>
                </div>
                <slot></slot>
            </div>
</template>
<script setup>
    import Close from './icons/Close.vue';
    import { ref, inject, onMounted} from 'vue';

    const emitter = inject('emitter');

    const emit = defineEmits(['removeWidget']);


    let instance = ref(null);

    const props = defineProps({      
            widgetID:{
                type:String,
                required:true
            },
            staticMode:{
                type:Boolean,
                required:true
            }
        })

    emitter.on('ImageViewwer-imageSelected-'+props.widgetID,(value)=>{
        instance.value.classList.toggle("focus-from-Img-View");
    })

onMounted(()=>{
 
})
</script>
<style scoped lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';

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
    }
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