<template>
    <header>      
        <h3>{{ navType }}</h3>
          <div>hide</div>
    </header>
            <div class="grid-stack-item-content py-16">
                <slot></slot>
            </div>
</template>
<script setup>
import { useOpenerStore } from '../stores/opener.ts';

const emit = defineEmits([]);

const props = defineProps({

    })
const opener = useOpenerStore();
const navType = opener.navigatorType;
</script>
<style scoped lang="scss">
header{
    justify-content: space-between;
    align-items: center;
    display:flex;
    flex-flow:row;

    h3{
        margin:10px;
    }
}

.grid-stack-item-content {
    position: relative !important;
    inset:0 !important;
    text-align: center;
}
:deep(.fill) {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
    flex-shrink: 1;
    width:100%;
    }
}
</style>