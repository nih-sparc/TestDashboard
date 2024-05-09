<template>

<el-dialog
    v-model="dialogVisible"
    title="QDB Graph Settings"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>

import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'


const props = defineProps({    
  openSettings:{default:false}
})
const dialogVisible =ref(props.openSettings);

const handleClose = () => {
  ElMessageBox.confirm('Hello World')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

</script>
<style>
</style>