<template>
<div v-bind="$attrs">
    <div v-click-out="saveInput" @keyup.enter="saveInput" class="tw-flex">
      <div v-show="editing">
          <el-input @focus="$event.target.select()" ref="textContentInput" v-model="textContent"></el-input>
      </div> 
      <div v-show="!editing" @click="editInput()" class="tw-w-full tw-h-full">
          <h3>{{ textContent }}</h3>
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
  
  //remove header completely
  const emit = defineEmits(['remove-header']);
  onMounted(() => {
    emit('remove-header');
  });

  const textContent = ref("Click To Enter Text");
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