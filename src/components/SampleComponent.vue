<template>                 
      <!-- slot is for header & user can add icons using childIcons-->
      <slot :widgetName="widgetName" :childIcons="childIcons"></slot>


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
    import GraphIcon from './icons/GraphIcon.vue';
    //this is included so that your component does not inherit props or attributes that you do not explicitly declare 
    defineOptions({
        inheritAttrs: false
    })

    //allows you to emit events that can be caught by other components. 
    const emitter = inject('emitter');

    const props = defineProps({
        widgetName:{
                type:String,
                required:true
        }
    })
    
    const widgetName = ref('New Custom Component!');//replace with component name you want shown
    function testIcon(){alert("test icon function")}
    //add icon to header
    const childIcons=shallowRef([{"comp":GraphIcon,"event":testIcon}])

    //emit and event
    let payload ={}
    emitter.emit('SampleComponent-eventName',payload);

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