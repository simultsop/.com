# DRY Components

DRY (Don't Repeat Yourself) Components is a collection of bare minimum utility components for Vue.js applications.

## Installation {#installation}

Install the DRY components package via npm:

```bash
npm install @s32n/dry
```

## Usage {#usage}

Import and use DRY components in your Vue.js application:

```js
import { defineComponent } from 'vue'
import { Dev, Prod, Inspect } from '@s32n/dry'

export default defineComponent({
  components: {
    Dev,
    Prod,
    Inspect
  },
  // ... rest of your component
})
```

## Components {#components}

### Dev {#dev}

Environment based rendering

**Basic Usage:**

```vue
<template>
  <dev>
    Show only in dev mode
  </dev>
</template>

<script setup>
import { Dev } from '@simultsop/dry'
</script>
```

### Prod {#prod}

Environment based rendering

**Basic Usage:**

```vue
<template>
  <prod>
    Show only in production mode
  </prod>
</template>

<script setup>
import { Prod } from '@s32n/dry'
</script>
```

### Inspect {#inspect}

Inspect data and alike

**Basic Usage:**

```vue
<template>
  <inspect :data="anyData"/>
</template>

<script setup>
import { Inspect } from '@s32n/dry'
const anyData = {
  many: "properties",
  toBe: "inspected"
}
</script>
```
