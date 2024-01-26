<template>
            <div ref="instance" class="grid-stack-item-content">

                <div class="content-header stick-to-top">
                    <h3>{{ widgetName }}</h3>
                    <close class="close-button" @click="$emit('removeWidget')"></close>
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
            widgetName:{
                type:String,
                required:true
            },           
            widgetID:{
                type:String,
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
    justify-content: space-between;
    align-items: center;
    display:flex;
    flex-flow:row;
    border: 1px solid $lineColor1;
    
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
    border: 1px solid $lineColor1;
    border-radius: 0.2rem;
    text-align: center;
    background-color: white;
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
    background:white;
}
.focus-from-Img-View{
        border:solid $lightPurple 2px !important;
    }
</style>