<template>

    <el-dialog
        v-model="dialogVisible"
        title="Text Widget Settings"
        width="20%"
        :append-to-body="true"
      >
      <div class="tw-m-2">

        <div>
          <div class="tw-p-1">
              <h4>Select This Widget's Value</h4>
          </div>
          <div class="tw-w-40">
            <select
            v-model="widgetSource">
              <option
              :value="null"
              :key="null">
                none - manual edit
              </option>
              <option
              v-for="ops in widgetSelectOptions"
              :value="ops.name"
              :key="ops.name">
              {{ ops.name}}
              </option>
            </select>
          </div>
        </div>

        <div>
          <div class="tw-p-1">
              <h4>Assign This Widget's Title</h4>
          </div>
          <div class="tw-w-40">
              <el-input
              v-model="widgetTitle"
              placeholder="default is value name"/>
          </div>
        </div>

        <div class="tw-flex tw-justify-between tw-w-40 tw-p-1 tw-pt-6">
          <label>Hide Header</label>
          <el-checkbox
            v-model="hideHeader"
            :value="hideHeader"
          />
        </div>
      </div>
    
        <template #footer>
          <div class="dialog-footer">
            <el-button class="secondary" @click="dialogVisible = false">Cancel</el-button>
            <el-button @click="updateTextVariable()">
              Save
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
    <script setup>
    
    import { ref, watch, computed } from 'vue'
    import {useGlobalVarsStore} from "../../stores/globalVars.ts"
    const globalVars = useGlobalVarsStore();

    const emit = defineEmits(['close-dialog','update-text-var']);
    const props = defineProps({
      showDialog:{
      type: Boolean,
      default: false
    },
    })

    //handle close dialog emit
    const dialogVisible = computed({
      get: () => props.showDialog,
      set: (value) => {
        if (!value) emit("close-dialog");
      },
    });

    //on Save button click
    const widgetSource = ref("");
    const widgetTitle = ref("");
    const hideHeader = ref(false);
    watch( hideHeader, (newVal) => {
      console.log(newVal)
        emit("hide-header",newVal);
    })

    function updateTextVariable(){
      emit("update-text-var",{"widgetSource":widgetSource.value,"title":widgetTitle.value});
      dialogVisible.value = false;
    }

    //Gather select options for user based on available global vars. 
    const widgetSelectOptions = computed(() => globalVars.optionsData);
    
    </script>
    <style scoped>
    .demo-color-block {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    .border-division{
      /* border-bottom: solid gray 1px;
      padding:.5rem; */
    }
    .border-division div {
      /* flex: 1 1 0;
      min-height: 20px; */
    
    }
    </style>