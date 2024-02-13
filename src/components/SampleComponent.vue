<template>
    <div ref="instance">
        <!-- all markup -->
    </div>
</template>
<script setup>

    import { ref, defineEmits, inject, watch, onMounted, onUnmounted } from 'vue';
    import { useOpenerStore } from '../stores/opener';

    //allows you to emit events that can be caught by other components. 
    const emitter = inject('emitter');
    const opener = useOpenerStore();

    const props = defineProps({
        widgetName:{
                type:String,
                required:true
        }
    })
    
    const emit = defineEmits(['setName']);
    emit('setName','New Custom Component!'); //replace with component name you want shown

    //emit and event
    let payload ={}
    emit('SampleComponent-eventName',payload);

    //catch an event
    // This catches when Image Selector throws the event when the image selector widget has an image selected
    //see Events in documentation for all available events
    emitter.on('Dashboard-Image-Selected', (value) => {  
        //do something
    });

</script>
<style scoped lang="scss">
//import SPARC styles
@import '../assets/delete-when-dsc2-imported/_variables.scss';

</style>