<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { Vitessce } from 'vitessce'

const vitessceContainer = ref(null)
let reactRoot = null

const props = defineProps({
  config:{
    type:String,
  }
})

function MyApp() {
  return React.createElement(Vitessce, {
    height: 500,
    theme: 'light',
    config: props.config
  })
}

onMounted(() => {
  if (vitessceContainer.value) {
    reactRoot = createRoot(vitessceContainer.value)
    reactRoot.render(React.createElement(MyApp))
  }
})

onBeforeUnmount(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>

<template>
  <div ref="vitessceContainer"></div>
</template>
