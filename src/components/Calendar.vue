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
        <td v-for="d in day.days"
            :key="d"
        >{{ d }}
        </td>
      </tr>
    </table>
    <button @click="emit('closeCalendar')">OK</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useDataStore } from "../store/DataStore";

const props = defineProps({
  show: Boolean,
  currentDate: String
})

const emit = defineEmits(['closeCalendar'])

const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const selected = currentYear

const month = ref(currentDate.getMonth() + 1)
const monthName = computed(() => useDataStore().months.find(m => m.id === month.value))

const lastDay = computed(() => new Date(currentYear.value, month.value, 0).getDate()) // 30 - последнее число месяца
const lastDayId = computed(() => new Date(currentYear.value, month.value, 0).getDay()) // 5 - последний день недели в месяце

const daysOfWeek = useDataStore().week
const lastDayOfWeek = computed(() => daysOfWeek.find(d => d.id === lastDayId.value))

const monthArray = computed(() => Array.from({ length: lastDay.value }, (_, index) => index + 1)) // все числа

const orderedMonth = () => {
  if (lastDayOfWeek.value) {
    const lastId = lastDayOfWeek.value.id
    daysOfWeek[lastId].days.push(lastDay.value)
    monthArray.value.slice(monthArray.value.length - 1, lastId + 1)
  }
}

onMounted(() => {
  return orderedMonth()
})

const yearSelect = (countPast: number, countFuture: number) => {
  const yearsArray = [currentYear.value]
  let year = currentYear.value
  let pastYearCounter = 0
  let futureYearCounter = 0
  while (pastYearCounter !== countPast) {
    yearsArray.unshift(year - 1)
    year--
    pastYearCounter++
  }
  year = 2023
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
  daysOfWeek.forEach(d => d.days = [])
  orderedMonth()
}

const nextMonth = function () {
  month.value === 12 ? month.value = 1 : month.value++
  daysOfWeek.forEach(d => d.days = [])
  orderedMonth()
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