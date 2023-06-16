<template xmlns="http://www.w3.org/1999/html">
  <div class="wrapper">
    <div class="now-time"> Current date and time: <br/>
      {{ currentDate }}
    </div>
    <div class="date-picker">
      <input readonly type="text"
             :value="inputValue"
             @click="showCalendar"
      />
      <calendar v-model:show="showModal"
                @close-calendar="showModal = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Calendar from "./components/Calendar.vue";

const currentDate = new Date()

const currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
const currentMonth = (currentDate.getMonth() + 1 < 10) ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear()

const showModal = ref(false)
const inputValue = ref<string>('Click to pick the date')

const showCalendar = () => {
  showModal.value = true
  inputValue.value = currentDay + ' / ' + currentMonth + ' / ' + currentYear
}

</script>

<style scoped lang="sass">
.wrapper
  height: 100vh
  position: relative

  .now-time
    color: white
    font-size: 25px
    padding: 20px
    font-family: "Roboto Thin", sans-serif
    background-color: rgba(58, 62, 93, 0.7)

  .date-picker
    top: 50%
    left: 50%
    width: 400px
    height: fit-content
    padding: 10px
    position: absolute
    display: flex
    flex-direction: column
    background-color: #396398
    transform: translateX(-50%) translateY(-50%)

    input
      width: 100%
      height: 35px
      padding: 0 20px
      margin-bottom: 10px

</style>
