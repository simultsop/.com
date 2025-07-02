# DRY Components

DRY (Don't Repeat Yourself) Components is a collection of bare minimum utility components for Vue.js applications. These components are designed to reduce code duplication and provide reusable solutions for common UI patterns.

## Installation {#installation}

Install the DRY components package via npm:

```bash
npm install @simultsop/dry
```

## Usage {#usage}

Import and use DRY components in your Vue.js application:

```js
import { defineComponent } from 'vue'
import { DryButton, DryInput, DryModal } from '@simultsop/dry'

export default defineComponent({
  components: {
    DryButton,
    DryInput,
    DryModal
  },
  // ... rest of your component
})
```

## Components {#components}

### DryButton {#dry-button}

A lightweight, customizable button component with built-in loading states and variants.

**Basic Usage:**

```vue
<template>
  <DryButton @click="handleClick">
    Click me
  </DryButton>
</template>

<script setup>
import { DryButton } from '@simultsop/dry'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

**With variants and loading state:**

```vue
<template>
  <div>
    <DryButton variant="primary" :loading="isLoading" @click="submitForm">
      Submit
    </DryButton>
    
    <DryButton variant="secondary" size="small">
      Cancel
    </DryButton>
    
    <DryButton variant="danger" disabled>
      Delete
    </DryButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DryButton } from '@simultsop/dry'

const isLoading = ref(false)

const submitForm = async () => {
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
}
</script>
```

### DryInput {#dry-input}

A versatile input component with validation support and multiple input types.

**Basic Usage:**

```vue
<template>
  <DryInput 
    v-model="email"
    type="email"
    placeholder="Enter your email"
    label="Email Address"
  />
</template>

<script setup>
import { ref } from 'vue'
import { DryInput } from '@simultsop/dry'

const email = ref('')
</script>
```

**With validation:**

```vue
<template>
  <DryInput 
    v-model="password"
    type="password"
    label="Password"
    :error="passwordError"
    :rules="passwordRules"
    @validate="handleValidation"
  />
</template>

<script setup>
import { ref } from 'vue'
import { DryInput } from '@simultsop/dry'

const password = ref('')
const passwordError = ref('')

const passwordRules = [
  (value) => value.length >= 8 || 'Password must be at least 8 characters',
  (value) => /[A-Z]/.test(value) || 'Password must contain uppercase letter',
  (value) => /[0-9]/.test(value) || 'Password must contain a number'
]

const handleValidation = (isValid, errors) => {
  passwordError.value = errors[0] || ''
}
</script>
```

### DryModal {#dry-modal}

A flexible modal component with customizable content and actions.

**Basic Usage:**

```vue
<template>
  <div>
    <DryButton @click="openModal">Open Modal</DryButton>
    
    <DryModal 
      v-model:visible="isModalVisible"
      title="Confirmation"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <p>Are you sure you want to proceed?</p>
    </DryModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DryButton, DryModal } from '@simultsop/dry'

const isModalVisible = ref(false)

const openModal = () => {
  isModalVisible.value = true
}

const handleConfirm = () => {
  console.log('Confirmed!')
  isModalVisible.value = false
}

const handleCancel = () => {
  console.log('Cancelled!')
  isModalVisible.value = false
}
</script>
```

**Custom modal with slots:**

```vue
<template>
  <DryModal v-model:visible="showCustomModal" :show-footer="false">
    <template #header>
      <h3>Custom Header</h3>
    </template>
    
    <template #default>
      <div class="custom-content">
        <p>This is custom modal content.</p>
        <DryInput v-model="userInput" placeholder="Enter something..." />
      </div>
    </template>
    
    <template #footer>
      <div class="custom-footer">
        <DryButton variant="secondary" @click="showCustomModal = false">
          Close
        </DryButton>
        <DryButton variant="primary" @click="saveData">
          Save
        </DryButton>
      </div>
    </template>
  </DryModal>
</template>

<script setup>
import { ref } from 'vue'
import { DryButton, DryInput, DryModal } from '@simultsop/dry'

const showCustomModal = ref(false)
const userInput = ref('')

const saveData = () => {
  console.log('Saving:', userInput.value)
  showCustomModal.value = false
}
</script>
```

## Configuration {#configuration}

You can configure DRY components globally:

```js
// main.js
import { createApp } from 'vue'
import { DryPlugin } from '@simultsop/dry'
import App from './App.vue'

const app = createApp(App)

app.use(DryPlugin, {
  theme: {
    primaryColor: '#00ADB5',
    borderRadius: '4px',
    fontSize: '14px'
  },
  components: {
    button: {
      defaultVariant: 'primary',
      defaultSize: 'medium'
    },
    modal: {
      closeOnOverlayClick: true,
      showCloseButton: true
    }
  }
})

app.mount('#app')
```

## Styling {#styling}

DRY components come with minimal, customizable styles:

```css
/* Override default styles */
.dry-button {
  --dry-button-padding: 8px 16px;
  --dry-button-border-radius: 6px;
  --dry-button-font-weight: 500;
}

.dry-input {
  --dry-input-border-color: #e1e5e9;
  --dry-input-focus-color: #00ADB5;
  --dry-input-error-color: #f56565;
}

.dry-modal {
  --dry-modal-backdrop-color: rgba(0, 0, 0, 0.5);
  --dry-modal-border-radius: 8px;
  --dry-modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

## TypeScript Support {#typescript}

DRY components include full TypeScript definitions:

```ts
import type { DryButtonProps, DryInputProps, DryModalProps } from '@simultsop/dry'

// Component props are fully typed
const buttonProps: DryButtonProps = {
  variant: 'primary',
  size: 'large',
  loading: false,
  disabled: false
}

// Event handlers are typed
const handleClick = (event: MouseEvent) => {
  console.log('Button clicked', event)
}
```

## More

For additional examples and advanced usage patterns, visit the [GitHub repository](https://github.com/simultsop/dry).