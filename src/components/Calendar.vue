<template>
  <div class="calendar" v-if="props.show">
    <div class="year-month">
      <select class="years" v-model="selected">
        <option v-for="year in years"
                :key="year"
        >{{ year }}
        </option>
      </select>
      <p class="date">
        <button class="arrow-left"
                @click="previousMonth"
        >&lt
        </button>
        {{ monthName.name }}
        <button class="arrow-right"
                @click="nextMonth"
        >&gt
        </button>
      </p>
    </div>
    <table class="picker">
      <tr class="daysColumn"
          v-for="day in daysOfWeek"
         :key="day"
      >{{ day.name }}
      <td>{{ lastDayName }}</td>
      <td>{{ lastDayName }}</td>
      </tr>
    </table>
    <button @click="emit('closeCalendar')">OK</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDataStore } from "../store/DataStore";

const props = defineProps({
  show: Boolean,
  currentDate: String
})

const emit = defineEmits(['closeCalendar'])

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const selected = ref(currentYear)

const month = ref(currentDate.getMonth() + 1)
const monthName = computed(() => useDataStore().months.find(m => m.id === month.value))

const lastDayName = new Date(currentYear, month.value, 0).getDay()


const daysOfWeek = useDataStore().week

const day = ref(currentDate.getDate())

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

const years = yearSelect(5, 5)

const previousMonth = function () {
  month.value === 1 ? month.value = 12 : month.value--
}

const nextMonth = function () {
  month.value === 12 ? month.value = 1 : month.value++
}

</script>

<style scoped lang="sass">
.calendar
  width: 100%

  .year-month
    gap: 10px
    height: 25px
    display: flex
    align-items: center
    justify-content: center

    .years
      width: 35%
      height: 100%

    p.date
      display: flex
      justify-content: space-between
      width: 65%
      margin: 0
      padding: 0
      background-color: white

      button
        border: none
        padding: 0 20px
        background-color: transparent

  .picker
    color: white
    display: grid
    margin: 10px 0
    text-align: center
    border: 2px solid rgba(58, 62, 93, 0.7)
    border-collapse: collapse
    grid-template-columns: repeat(7, 1fr)

    .daysColumn
      margin: 0
      display: flex
      flex-direction: column
      border-right: 2px solid rgba(58, 62, 93, 0.7)

      &:last-child
        border-right: 0

      td
        color: black
        background-color: white
        border-top: 2px solid rgba(58, 62, 93, 0.7)
        padding: 0

        &:first-child
          border-top: 0

        &:hover
          cursor: pointer
          background-color: lightblue

</style>