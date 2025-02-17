<template>
      <slot :widgetName="widgetName"></slot>
<div v-bind="$attrs">

    <div v-click-out="saveInput" @keyup.enter="saveInput" class="tw-flex">
      <div v-show="editing">
          <el-input @focus="$event.target.select()" ref="textContentInput" v-model="textContent"></el-input>
      </div> 
      <div v-show="!editing" @click="editInput()" class="tw-w-full tw-h-full">
          <h2>{{ textContent }}</h2>
      </div>
      <el-icon v-show="!editing" :size="size" :color="color">
        <Edit @click="editInput()"/>
      </el-icon>
    </div>
  </div>

</template>
<script setup>
  import { ref, inject, onMounted } from "vue";

  defineOptions({
      inheritAttrs: false
  })    
  const props = defineProps({
    displayText:String,
    hideHeader:Boolean
  })
  const emit = defineEmits(['remove-header']);
  const widgetName = props.header?ref('Text Widget'):"";

  onMounted(() => {
    if(props.hideHeader){emit("remove-header")}
  });

  const textContent = ref(props.displayText);
  const editing = ref(false);
  const textContentInput = ref(null);

  function editInput(){
        editing.value=true;
        textContentInput.value ? textContentInput.value.focus(): "";
  }
  function saveInput(){
        editing.value=false;
  }
</script>
<style scoped>
  .selector-body{
      
  }
</style>