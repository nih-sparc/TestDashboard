<template>

    <div class="grid-stack-item-content">
        <div class="content-header">
            <h3>{{ navType }}</h3>
            <div>hide</div>
        </div>
        <slot></slot>
    </div>
</template>
<script setup>
import { useOpenerStore } from '../stores/opener.ts';

const emit = defineEmits([]);

const props = defineProps({
    navType:String
    })
const opener = useOpenerStore();

</script>
<style scoped lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';
.content-header{
    justify-content: space-between;
    align-items: center;
    display:flex;
    flex-flow:row;

    h3{
        margin:10px;
    }
}

.grid-stack-item-content {
    border: 1px solid $lineColor1;
    border-radius: 0.2rem;
    text-align: center;
    background:$lineColor2;
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