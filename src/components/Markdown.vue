<template>
    <!-- keep your slot, but make sure these exist -->
    <slot :widgetName="widgetName" :childIcons="childIcons"></slot>
  
    <div class="markdown-widget-wrap" v-bind="$attrs">
  
      <!-- Edit mode -->
      <textarea
        v-if="isEditMode"
        v-model="localText"
        @input="emitInput"
        class="markdown-input"
        placeholder="Write markdown here…"
      />
  
      <!-- Preview mode -->
      <div
        v-else
        class="markdown-output"
        v-html="renderedHtml"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed, shallowRef } from 'vue'
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  import { Edit } from '@element-plus/icons-vue'
  // import { useGlobalVarsStore } from '../stores/globalVars.ts'
  
  defineOptions({ inheritAttrs: false })
  
  const props = defineProps<{
    /** Markdown input; use v-model:markdownText for two-way binding */
    markdownText?: string
    /** Force mode from parent if desired */
    mode?: 'edit' | 'preview'
    /** If false, skips sanitization (not recommended) */
    sanitize?: boolean
    /** If you ever want to pass raw HTML instead of MD */
    inputFormat?: 'markdown' | 'html'
  }>()
  
  const emit = defineEmits<{
    (e: 'update:markdownText', value: string): void
    (e: 'changeMode', value: 'edit' | 'preview'): void
  }>()
  
  // Provide values for your scoped slot so it doesn't error
  const widgetName = 'Markdown'
  const childIcons=shallowRef([{"comp":Edit,"event":toggleMode,"tooltip":"Edit Markdown"}])
  
  // Marked config (tweak to taste)
  marked.setOptions({
    gfm: true,
    breaks: true
    // You can also plug in a custom renderer if you want
  })
  
  // Local editable copy + prop sync
  const localText = ref(props.markdownText ?? '')
  watch(() => props.markdownText, (v) => {
    if (v !== undefined && v !== localText.value) localText.value = v
  })
  
  // Edit/preview mode (controlled or uncontrolled)
  const isEditMode = ref(props.mode ? props.mode === 'edit' : true)
  watch(() => props.mode, (m) => {
    if (m) isEditMode.value = m === 'edit'
  })
  
  const renderedHtml = computed(() => {
    const raw = props.inputFormat === 'html'
      ? (localText.value ?? '')
      : marked.parse(localText.value ?? '')
  
    return props.sanitize === false ? raw : DOMPurify.sanitize(raw)
  })
  
  function emitInput() {
    emit('update:markdownText', localText.value)
  }
  
  function toggleMode() {
    isEditMode.value = !isEditMode.value
    emit('changeMode', isEditMode.value ? 'edit' : 'preview')
  }
  </script>
  
  <style scoped>
.markdown-widget-wrap {
  max-width: none;
  width: 100%;
  min-width: 0;           
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 5px;         
}
  

  .markdown-input,
  .markdown-output {
    flex: 1 1 auto;
    width: 100%;
    height: 100%; 
    min-height: 0;        
    box-sizing: border-box;
  }
  
  .markdown-input {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    resize: none;
  }
  
  .markdown-output {
    overflow: auto;       
  }
  

  .markdown-output :deep(pre),
  .markdown-output :deep(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
  .markdown-output :deep(h1) { font-size: 1.75rem; margin: 1rem 0 .5rem; }
  .markdown-output :deep(h2) { font-size: 1.5rem; margin: 1rem 0 .5rem; }
  .markdown-output :deep(p)  { margin: .5rem 0; }
  </style>
  