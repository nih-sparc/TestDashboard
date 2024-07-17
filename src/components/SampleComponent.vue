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

    const widgetName = ref('New Custom Component!');//replace with component name you want shown
    
    //add icon to header. must import your icon as shown above ex: import GraphIcon from './icons/GraphIcon.vue'
    //this is optional and can be deleted
    const childIcons=shallowRef([{"comp":GraphIcon,"event":testIcon}]);
    function testIcon(){alert("test icon function")};

    //emit a custom event that you name
    //if you create an event that you want available for other widgets/users, please document it under Events in the README.md
    //allows you to emit events that can be caught by other components. 
    const emitter = inject('emitter');
    let payload ={} //can be any type
    emitter.emit('SampleComponent-eventName',payload);

    //catch an event
    // This is an active event that gets called by the ImageSelector component when a user clicks the "open" button on an image.
    //see Events in documentation for all available events
    emitter.on('ImageSelector-mbfImageSelected', (value) => {  
        //do something
    });

</script>
<style scoped lang="scss">
//import SPARC styles if you want to have access to them. 
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

//example of class styles
.sample-component{
    height:500px;
    width:400px;
    border: solid purple 1px;
    background-color: lightgray;
}
</style>