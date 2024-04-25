<template>
    <div ref="instance">
        <div class="sample-component">this is a sample component
        <div> 
            <p>more of the component goes here</p>
        </div>
        </div>
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
    
    const emit = defineEmits(['setTitle']);
    emit('setTitle','New Custom Component!'); //replace with component name you want shown

    //emit and event
    let payload ={}
    emit('SampleComponent-eventName',payload);

    //catch an event
    // This catches when a new widget is added to the sparc dashboard main component
    //see Events in documentation for all available events
    emitter.on('SparcDashboard-addNewWidget', (value) => {  
        //do something
    });

</script>
<style scoped lang="scss">
//import SPARC styles
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

.sample-component{
    height:500px;
    width:400px;
    border: solid purple 1px;
    background-color: lightgray;
}
</style>