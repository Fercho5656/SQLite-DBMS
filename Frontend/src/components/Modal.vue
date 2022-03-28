<template>
    <transition name="fade">
        <div class="modal-wrapper" >
            <div class="modal-background" @click="close"></div>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script setup lang="ts">

import { ref, watch } from "vue";

const showModal = ref(false);
defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
defineEmits(['close'])
watch(() => showModal, (newVal) => {
    showModal.value = newVal.value;
})
</script>

<style>
.modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9998;
    overflow-y: auto;
}
.modal-background {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.modal-content {
    z-index: 9999;
    width: auto;
    height: auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(182, 166, 166, 0.5);
    padding: 20px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>