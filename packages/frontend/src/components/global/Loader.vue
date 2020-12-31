<template>
  <div class="spring-spinner" :style="spinnerStyle">
    <div class="spring-spinner-part top" :style="spinnerPartStyle">
      <div class="spring-spinner-rotator" :style="rotatorStyle"></div>
    </div>
    <div class="spring-spinner-part bottom" :style="spinnerPartStyle">
      <div class="spring-spinner-rotator" :style="rotatorStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/epicmaxco/epic-spinners/blob/master/src/components/lib/SpringSpinner.vue
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
} from 'vue'
import { PRIMARY_COLOR } from '@/app/utils/constants'

const utils = {
  /**
   * Add reyframes to body as style block
   * @param name string
   * @param frames string
   */
  appendKeyframes: function (name: string, frames: string) {
    const sheet = document.createElement('style')
    if (!sheet) {
      return
    }
    sheet.setAttribute('id', name)
    sheet.innerHTML = `@keyframes ${name} {${frames}}`
    document.body.appendChild(sheet)
  },
  /**
   * Remove reyframes from body
   * @param name string
   */
  removeKeyframes: function (name: string) {
    const sheet = document.getElementById(name)
    if (!sheet) {
      return
    }
    const sheetParent = sheet.parentNode
    if (sheetParent) sheetParent.removeChild(sheet)
  },
}

export default defineComponent({
  name: 'SpringSpinner',
  props: {
    animationDuration: {
      type: Number,
      default: 2700,
    },
    size: {
      type: Number,
      default: 50,
    },
    color: {
      type: String,
      default: PRIMARY_COLOR,
    },
  },

  setup({ size, animationDuration, color }) {
    const state = reactive({
      animationName: `spring-spinner-animation-${Date.now()}`,
    })

    const spinnerStyle = computed(() => {
      return {
        height: `${size}px`,
        width: `${size}px`,
      }
    })

    const spinnerPartStyle = computed(() => {
      return {
        height: `${size / 2}px`,
        width: `${size}px`,
      }
    })

    const rotatorStyle = computed(() => {
      return {
        height: `${size}px`,
        width: `${size}px`,
        borderRightColor: color,
        borderTopColor: color,
        borderWidth: `${size / 7}px`,
        animationDuration: `${animationDuration}ms`,
        animationName: animationDuration,
      }
    })

    const updateAnimation = () => {
      utils.removeKeyframes(state.animationName)
      utils.appendKeyframes(state.animationName, generateKeyframes())
    }

    const generateKeyframes = () => {
      return `
          0% {
            border-width: ${size / 7}px;
          }
          25% {
            border-width: ${size / 23.33}px;
          }
          50% {
            transform: rotate(115deg);
            border-width: ${size / 7}px;
          }
          75% {
            border-width: ${size / 23.33}px;
           }
          100% {
           border-width: ${size / 7}px;
          }`
    }

    onMounted(updateAnimation)

    onBeforeUnmount(() => utils.removeKeyframes(state.animationName))

    watch(() => size, updateAnimation)

    watch(() => color, updateAnimation)

    return {
      spinnerStyle,
      spinnerPartStyle,
      rotatorStyle,
    }
  },
})
</script>

<style scoped>
.spring-spinner,
.spring-spinner * {
  box-sizing: border-box;
}
.spring-spinner {
  height: 60px;
  width: 60px;
}
.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: calc(60px / 2);
  width: 60px;
}
.spring-spinner .spring-spinner-part.bottom {
  transform: rotate(180deg) scale(-1, 1);
}
.spring-spinner .spring-spinner-rotator {
  width: 60px;
  height: 60px;
  border: calc(60px / 7) solid transparent;
  border-right-color: #ff1d5e;
  border-top-color: #ff1d5e;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}
/* NOTE Keyframes here serve as reference. They don't do anything. */
@keyframes spring-spinner-animation {
  0% {
    border-width: calc(60px / 7);
  }
  25% {
    border-width: calc(60px / 23.33);
  }
  50% {
    transform: rotate(115deg);
    border-width: calc(60px / 7);
  }
  75% {
    border-width: calc(60px / 23.33);
  }
  100% {
    border-width: calc(60px / 7);
  }
}
</style>
