# TestDashboard
The test dashboard is part of the Sparc Portal and is meant to compare various vagus nerve images. This is v1. Will be migrated and renamed. 

## Storybook
View the storybook of working components here
https://nih-sparc.github.io/TestDashboard/?path=/docs/components-biolucidaviewer--docs

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) 

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
Yarn install
```

### Compile and Hot-Reload for Development

```sh
Yarn run dev
```

### Type-Check, Compile and Minify for Production

```sh
Yarn run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
Yarn run lint
```

## Dependency Setup

If you are installing this project as a node module dependency you need the following installed in your project. 
Vue(^3.3.4), Pinia(^2.1.7), mitt (^3.0.1), sparc-design-system-components-2 (0.0.26)

```sh
yarn add pina
yarn add vue
yarn add mitt
yarn add sparc-design-system-components-2
```
### Adding dependencies to your project

```js

import { createApp, defineAsyncComponent } from 'vue'
import mitt from 'mitt'
import DesignSystemComponentsPlugin from 'sparc-design-system-components-2'
import App from './App.vue'
//this allows for dynamically importing components
import { useGlobalVarsStore } from '../node_modules/sparc-dashboard-beta/src/stores/globalVars'
import { createPinia } from 'pinia'

const app = createApp(App);

//import mitt and set as emitter
const emitter = mitt();
app.provide('emitter', emitter); 

//list whichever components you want available and import them dynamically
const componentMap = [
    'SubjectNav',
    'ImageSelector',
    'ImageViewer',
    'LocationNav',
    'FlatmapViewer',
    'BiolucidaViewer'
]
componentMap.forEach(comp=>{
    const asyncComponent = defineAsyncComponent(() => import(`../node_modules/sparc-dashboard-beta/src/components/${comp}.vue`)); 
    app.component(comp, asyncComponent);
})

app.use(createPinia());
//add list of components to add componet drop down
const globalVars = useGlobalVarsStore();
globalVars.componentList = componentMap;


app.use(DesignSystemComponentsPlugin);
app.mount('#app');

```

# DOCUMENTATION 
- adding custom component to dashboard

### DESCRIPTION
Custom component that can be added within the dashboard and has the capabilities to interact with other components.


### INSTALLATION
Clone the github repo and navigate to src/components/SampleComponent.vue

Expose Your Custom Component to the Dashboard:
 - Add component tag name to the main.ts document
	src/main.ts
```
const componentMap = [
   'SubjectNav',
   'ImageSelector',
   'ImageViewer'
  ] 
```

Using the component “SampleComponent”, It would look something like this:
```
const componentMap = [
   'SubjectNav',
   'ImageSelector',
   'ImageViewer',
   'SampleComponent'
    ]
```

* component name should align with file name. SampleComponent.vue should be renamed and then that new name should be added in main.ts 


### PROPERTIES
These are passed down to the your component (SampleComponent) from its wrapper via the props value


**widgetName**: 
name of component tag. Changing this will change the title of the wrapper. If you want a display name that is different from the file name. 
Set Display name (widgetName) using emit.
   ```
const emit = defineEmits(['setTitle']);
emit('setTitle','New Custom Component!'); //replace with component name you want shown
```



### CUSTOM EMITS/EVENTS:

SPARC Dashboard  uses mitt to implement an event bus. You can use the following methods to emit a custom event that other widgets can pick up or listen to. For example, if your widget has a feature that selects a custom filter and you want it available throughout the dashboard for other widgets to know about, emit your event this way. 

In your project:
Import inject from vue. 
Assign a value to ‘emitter’
   ```
import {inject} from 'vue';
const emitter = inject('emitter');
```
this is already done for you in the SampleWidget

***Building a custom emit/event***
Send your event using naming convention ComponentName-eventName
Example:
   ```
let payload ={}
emit('SampleComponent-eventName',payload);
```
	*see options for events you can emit that are already standard throughout the dashboard. 

### OPTIONS

***setTitle:*** 
component ‘s name defaults to it’s vue tag-name. This allows you override it and add a different name

Example:
   ```
const emit = defineEmits(['setTitle']);
emit('setTitle','MUSE Image Viewer');
```

**other options to come. Examples might include a standard way of setting a filter that most widgets would find useful (age/sex/metadata for example)**

### EVENTS

***ImageSelector-selectImage***
- Thrown when image selector widget has selected an image
Example:

```
emitter.on('ImageSelector-selectImage', (value) => { 
       //do something
   });
   ```
Here is an example of the SampleComponent.vue file as of 1/26/2024. See github for latest versions

```
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
  
   const emit = defineEmits(['setTitle']);
   emit('setTitle','New Custom Component!'); //replace with component name you want shown


   //emit and event
   let payload ={}
   emit('SampleComponent-eventName',payload);


   //catch an event
   // This catches when Image Selector throws the event when the image selector widget has an image selected
   //see Events in documentation for all available events
   emitter.on('ImageSelector-selectImage', (imagePath) => { 
       //do something
   });


</script>
<style scoped lang="scss">
//import SPARC styles
@import '../assets/delete-when-dsc2-imported/_variables.scss';


</style>
```

