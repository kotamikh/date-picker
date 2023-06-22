<template>
  <div class="calendar" v-if="props.show">
    <div class="year-month">
      <select class="years" v-model="selected"
              @change="orderedMonth()"
      >
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
            :class="{ chosen : d === isChosen }"
            @click="newDate(`${d} / ${monthName.id} / ${currentYear}`, d)"
        >{{ d }}
        </td>
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

const emit = defineEmits(['closeCalendar', 'newDate'])

const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const selected = currentYear

const isChosen = ref(currentDate.getDate())

const month = ref(currentDate.getMonth() + 1)
const monthName = computed(() => useDataStore().months.find(m => m.id === month.value))

const lastDay = computed(() => new Date(currentYear.value, month.value, 0).getDate()) // 30 - последнее число месяца
const lastDayId = computed(() => new Date(currentYear.value, month.value, 0).getDay()) // 5 - последний день недели в месяце

const daysOfWeek = useDataStore().week
const lastDayOfWeek = computed(() => daysOfWeek.find(d => d.id === lastDayId.value))

const monthArray = computed(() => Array.from({ length: lastDay.value }, (_, index) => index + 1)) // все числа

const weeks = () => {
  if (lastDayOfWeek.value) {
    const lastId = lastDayOfWeek.value.id
    const lastWeek: Array<number | '-'> = monthArray.value.splice(monthArray.value.length - lastId - 1, monthArray.value.length)
    while (lastWeek.length < 7) {
      lastWeek.push('-')
    }
    const orderedWeeks = [lastWeek]

    while (monthArray.value.length >= 7) {
      let week = monthArray.value.splice(monthArray.value.length - 7, monthArray.value.length)
      orderedWeeks.unshift(week)
    }

    const emptyDays = new Array(7 - monthArray.value.length).fill(0)
    if (emptyDays.length !== 7) {
      const firstWeek = emptyDays.concat(monthArray.value)
      orderedWeeks.unshift(firstWeek)
    }
    return orderedWeeks
  }
}

const orderedMonth = () => {
  daysOfWeek.forEach(d => d.days = [])
  const orderedWeeks = weeks()
  if(orderedWeeks) {
    for (let week of orderedWeeks) {
      let weekId = orderedWeeks.indexOf(week)
      for (let i = 0; i < orderedWeeks[weekId].length; i++) {
        if (orderedWeeks[weekId][i] === 0) {
          daysOfWeek[i].days.push('-')
        } else {
          daysOfWeek[i].days.push(orderedWeeks[weekId][i])
        }
      }
    }
  }
}

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
  year = currentYear.value
  while (futureYearCounter !== countFuture) {
    yearsArray.push(year + 1)
    year++
    futureYearCounter++
  }
  orderedMonth()
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

const newDate = (date: string, d: number | '-') => {
  if(!date.includes('-')) {
    emit('newDate', date)
    if(typeof(d) === "number") {
      isChosen.value = d
    }
  }
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

      .chosen
        background-color: lightblue

</style>