import { IMonth, MonthName } from "../types/months";
import { defineStore } from "pinia";
import { IDayOfWeek, WeekDayName } from "../types/daysOfWeek";

export const useDataStore = defineStore('dataStore', () => {
    const months: Array<IMonth> = [
        {
            name: MonthName.Jan,
            id: 1
        },
        {
            name: MonthName.Feb,
            id: 2
        },
        {
            name: MonthName.Mar,
            id: 3
        },
        {
            name: MonthName.Apr,
            id: 4
        },
        {
            name: MonthName.May,
            id: 5
        },
        {
            name: MonthName.Jun,
            id: 6
        },
        {
            name: MonthName.Jul,
            id: 7
        },
        {
            name: MonthName.Aug,
            id: 8
        },
        {
            name: MonthName.Sep,
            id: 9
        },
        {
            name: MonthName.Oct,
            id: 10
        },
        {
            name: MonthName.Nov,
            id: 11
        },
        {
            name: MonthName.Dec,
            id: 12
        }
    ]

    const week: Array<IDayOfWeek> = [
        {
            name: WeekDayName.Sun,
            id: 0,
            days: []
        },
        {
            name: WeekDayName.Mon,
            id: 1,
            days: []
        },
        {
            name: WeekDayName.Tue,
            id: 2,
            days: []
        },
        {
            name: WeekDayName.Wed,
            id: 3,
            days: []
        },
        {
            name: WeekDayName.Thu,
            id: 4,
            days: []
        },
        {
            name: WeekDayName.Fri,
            id: 5,
            days: []
        },
        {
            name: WeekDayName.Sat,
            id: 6,
            days: []
        }
    ]

    return {
        months,
        week
    }
})
