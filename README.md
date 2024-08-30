# TestDashboard
The test dashboard is part of the Sparc Portal and is meant to compare various vagus nerve images. This is v1. Will be migrated and renamed. 

[See LATEST DEMO](https://sparc-app-2-dev-features-2a5a06b8ea5c.herokuapp.com/apps/dashboard)


## Storybook
View the storybook of working components here
https://nih-sparc.github.io/TestDashboard/?path=/docs/components-biolucidaviewer--docs

Dev version here
https://sparc-app-2-dev-features-2a5a06b8ea5c.herokuapp.com/apps/dashboard

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

If you are installing this project as a node module [npm](https://www.npmjs.com/package/sparc-dashboard-beta) dependency you need the following installed in your project. 
Vue(^3.3.4), Pinia(^2.1.7), mitt (^3.0.1), sparc-design-system-components-2 (0.0.26)
```sh
yarn add pina
yarn add vue
yarn add mitt
yarn add sparc-design-system-components-2
```
### Importing Dashboard into your project

```js


import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import 'sparc-dashboard-beta/dist/style.css'
import sparcDesignSystemComponents2Umd from 'sparc-design-system-components-2';
import {default as SparcDashboard, installDashboard} from 'sparc-dashboard-beta';

const app = createApp(App);
let piniaInstance = createPinia();
app.use(piniaInstance);
installDashboard(app, piniaInstance);//call the install method and pass in the app and pinia instance
app.component("SparcDashboard",SparcDashboard) // add the dashboard component to your vue app
app.use(sparcDesignSystemComponents2Umd);
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
	src/main.ts or src/main.js
```
const componentMap = [
    'ImageSelector',
    'FlatmapViewer',
    'BiolucidaViewer',
    'QDBGraph'
  ] 
```

Using the component “SampleComponent”, It would look something like this:
```
const componentMap = [
    'ImageSelector',
    'FlatmapViewer',
    'BiolucidaViewer',
    'QDBGraph',
   'SampleComponent'
    ]
```

* component name should align with file name. SampleComponent.vue should be renamed and then that new name should be added in main.ts 

### Template

This is your default template. Customize however you like with html and vue 3 markup. Do not delete the header which is added via the <slot> tag
```
<template>                 
      <!-- slot is for header & user can add icons using childIcons-->
      <slot :widgetName="widgetName" :childIcons="childIcons"></slot>


    <div ref="instance">
        <div class="sample-component">this is a sample component
        <div> 
            <p>more of the component goes here</p>
        </div>
        </div>

    </div>
</template>
```
## Header

### Set Name

This line in your setup script allows you to set the header to your widget name. It does not have to match to file name. 
```
    const widgetName = ref('New Custom Component!');//replace with component name you want shown
 ```
DO NOT DELETE SLOT

This is where your header is set. Do not delete or change the name
```
<slot :widgetName="widgetName"></slot>
```

### Set Icons

There are default icons on the header. A download one and a close icon (when in edit mode). 
You can add a custom icon to your widget's header and send it a function. 

Here we are adding a graph icon that when clicked will alert the user. 
js
```
    const childIcons=shallowRef([{"comp":GraphIcon,"event":testIcon}]);
    function testIcon(){alert("test icon function")};
```
html
```
   <slot :widgetName="widgetName" :childIcons="childIcons"></slot>
```
A more practical case will be to open a settings window. Simply have a function that sets your settings visibility to true. See QDBGraph and it's QDBGraphSettings for a working example. 

### PROPERTIES
These are passed down to the your component (SampleComponent) from its wrapper via the props value

**there are no properties available at this time


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

### EVENTS

***ImageSelector-mbfImageSelected***
- Thrown when image selector (ImageSelector.vue) widget has selected an image
Example for use:

```
emitter.on('ImageSelector-mbfImageSelected', (value) => { 
       //do something
   });
```
***FlatmapViewer-selectImage***
- Thrown when user selects segment of Flatmap Viewer (FlatmapViewer.vue) 
```
    emitter.on('FlatmapViewer-selectImage', (selectedImage) => { 
        //do something
    });
```

## Sample Component

Here is an example of the SampleComponent.vue file as of 7/17/2024. See github for latest versions

```
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
```

