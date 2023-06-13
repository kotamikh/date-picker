<template>
  <div class="calendar" v-if="props.show">
    <div class="date">
      <select class="years" v-model="selected">
        <option v-for="year in years"
                :key="year"
        >{{ year }}
        </option>
      </select>
      <p class="date">
        <button class="arrow-left"
                @click="previousMonth"
        >&lt</button>
        {{ currentMonth + ', ' + day }}
        <button class="arrow-right"
                @click="nextMonth"
        >&gt</button>
      </p>
    </div>
    <div></div>
    <button @click="emit('closeCalendar')">OK</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  show: Boolean,
  currentDate: String
})

const emit = defineEmits(['closeCalendar'])

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const selected = ref(currentYear)

const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
const currentDay = currentDate.getDate()
const month = ref(currentMonth)
const day = ref(currentDay)

const years = computed(() => yearSelect(5, 5))

const yearSelect = (countPast: number, countFuture: number) => {
  const yearsArray = [currentYear]
  let year = currentYear
  let pastYearCounter = 0
  let futureYearCounter = 0
  while (pastYearCounter !== countPast) {
    yearsArray.unshift(year - 1)
    year--
    pastYearCounter++
  }
  year = currentYear
  while (futureYearCounter !== countFuture) {
    yearsArray.push(year + 1)
    year++
    futureYearCounter++
  }
  return yearsArray
}

const previousMonth = () => {
  day.value = 1
}

const nextMonth = () => {
  day.value = 1
}

</script>

<style scoped lang="sass">
.calendar
  width: 100%

  .date
    gap: 10px
    display: flex
    align-items: center
    justify-content: center

    .years
      width: 30%
      height: fit-content

    p.date
      display: flex
      justify-content: space-between
      width: 70%
      margin: 0
      padding: 0
      background-color: white

      button
        border: none
        padding: 0 20px
        background-color: transparent
</style>