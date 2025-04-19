<template>
  <el-dialog
    class="full-dialog-dashboard"
    v-model="dialogVisible"
    title="Text Widget Settings"
    :append-to-body="true"
  >
    <div class="widget-settings-container">
      
      <!-- Row for Widget Value & Widget Title -->
      <div class="widget-settings-row">
        <!-- Select Widget Value -->
        <div class="widget-setting">
          <h4>Select This Widget's Value</h4>
          <select v-model="widgetSource">
            <option :value="null" :key="null">none - manual edit</option>
            <option v-for="ops in widgetSelectOptions" :value="ops.name" :key="ops.name">
              {{ ops.name }}
            </option>
          </select>
        </div>

        <!-- Assign Widget Title -->
        <div class="widget-setting">
          <h4>Assign This Widget's Title</h4>
          <el-input v-model="widgetTitle" placeholder="default is value name"/>
        </div>
      </div>

      <!-- Hide Header Checkbox (Placed Below) -->
      <div class="widget-hide-header">
        <label>Hide Header</label>
        <el-checkbox v-model="hideHeader" :value="hideHeader" />
      </div>
      
    </div>

    <!-- Footer -->
    <template #footer>
      <div class="dialog-footer">
        <el-button class="secondary" @click="dialogVisible = false">Cancel</el-button>
        <el-button @click="updateTextVariable()">Save</el-button>
      </div>
    </template>

  </el-dialog>
</template>

    <script setup>
    
    import { ref, watch, computed} from 'vue'
    import { storeToRefs } from 'pinia';
    import {useGlobalVarsStore} from "../../stores/globalVars.ts"
    const globalVars = useGlobalVarsStore();

    const emit = defineEmits(['close-dialog','update-text-var']);
    const props = defineProps({
    showDialog: {
      type: Boolean,
      default: false,
    },
    widgetSourceValue: {
      type: String,
      default: "",
    },
    widgetTitleValue: {
      type: String,
      default: "",
    },
    hideHeaderValue: {
      type: Boolean,
      default: false,
    }
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

    watch(() => props.showDialog, (val) => {
      if (val) {

        widgetSource.value = props.widgetSourceValue;
        widgetTitle.value = props.widgetTitleValue;
        hideHeader.value = props.hideHeaderValue;
        console.log(props.widgetSourceValue)
      }
    });

    watch( hideHeader, (newVal) => {
        emit("hide-header",newVal);
    })

    function updateTextVariable(){
      emit("update-text-var",{"widgetSource":widgetSource.value,"title":widgetTitle.value});
      dialogVisible.value = false;
    }

    //Gather select options for user based on available global vars. 
    const { optionsData: widgetSelectOptions } = storeToRefs(globalVars);
    
    </script>
    <style scoped lang="scss">
@import '../../assets/vars.scss';

.full-dialog-dashboard {
  width: 95%;
  height: 95%;
  margin: auto;
  margin-top: 2.5%;
}

.widget-settings-container {
  display: flex;
  flex-direction: column;
  gap: 16px; 
  font-family: Roboto, sans-serif;
  font-size: 14px;
  color: var(--textDark);
}

/* Row for Select & Title Fields */
.widget-settings-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

/* Styling for Each Setting */
.widget-setting {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.widget-setting select,
.widget-setting input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--el-color-primary-dark-2);
  border-radius: 4px;
}

/* Hide Header Section */
.widget-hide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  width:25%;
}

/* Button Styles */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.el-button {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary-dark-2);
  color: white;
}

.el-button:hover {
  background-color: var(--el-color-primary-light-3);
  border-color: var(--el-color-primary-dark-2);
}
.el-input{
  height: 35px;
}

    </style>