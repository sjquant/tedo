<template>
  <div class="bg-neutral-100 py-2 px-4 rounded">
    <input
      ref="input"
      type="text"
      class="w-full bg-transparent focus:outline-none"
      v-model="newTodo"
      @keyup.enter="addTodo"
      @blur="toggleInput"
      v-if="inputActive"
    />
    <div class="w-full flex justify-center" v-else>
      <button class="w-full text-gray-400" @click="toggleInput">
        + 새로운 할 일 추가하기
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, Ref, ref, watch } from "vue";

const newTodo = ref("");
const inputActive = ref(false);
const input: Ref<HTMLInputElement | null> = ref(null);

const emit = defineEmits<{
  (e: "confirm", todo: string): void;
}>();

function addTodo() {
  emit("confirm", newTodo.value);
  newTodo.value = "";
}

function toggleInput() {
  if (inputActive.value && input.value?.value) {
    return;
  }
  inputActive.value = !inputActive.value;
}

watch(inputActive, async function (value) {
  if (value) {
    await nextTick();
    input.value?.focus();
  }
});
</script>
