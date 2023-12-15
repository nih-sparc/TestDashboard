<template>
            <div ref="instance" class="grid-stack-item-content">
                <div class="content-header">
                    <h3>{{ widgetName }}</h3>
                    <h3>{{ foo }}</h3>
                    <close class="close-button" @click="$emit('removeWidget')"></close>
                </div>
                <slot></slot>
            </div>
</template>
<script setup>
    import Close from './icons/Close.vue';
    import { ref, inject, nextTick, onMounted} from 'vue';

    const emitter = inject('emitter');

    const emit = defineEmits(['removeWidget']);


    const foo = ref("foo");
    const bar = ref("bar");
    let instance = null;

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
    // accepts and executes custom function on this widget's scope
    //just import inject and add ref="instance" to template
        const customFunction = ref(null);
        const allRefs = {foo,bar} // ref you want to expose
    
        emitter.on('custom-events-ItemWidget-'+props.widgetID,(value)=>{
            customFunction.value = value;
            nextTick(()=>{
                customFunction.value(instance, allRefs);
            })
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