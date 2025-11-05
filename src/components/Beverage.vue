<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />

    <Contents>
      <template #top>
        <Creamer
          v-if="beverageStore.currentCreamer.name !== 'No Cream'"
          :style="{ backgroundColor: beverageStore.currentCreamer.color }"
        />
      </template>

      <template #mid>
        <Syrup
          v-if="beverageStore.currentSyrup.name !== 'No Syrup'"
          :style="{ backgroundColor: beverageStore.currentSyrup.color }"
        />
      </template>

      <template #bottom>
        <Base :style="{ backgroundColor: beverageStore.currentBase.color }" />
      </template>
    </Contents>
  </Mug>
</template>

<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";

import { useBeverageStore } from "../stores/beverageStore";

const beverageStore = useBeverageStore();

type Props = { isIced: boolean };
defineProps<Props>();
</script>
