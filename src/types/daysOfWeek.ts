export enum WeekDayName {
    Sun = 'Sun',
    Mon = 'Mon',
    Tue = 'Tue',
    Wed = 'Wed',
    Thu = 'Thu',
    Fri = 'Fri',
    Sat = 'Sat'
}

export interface IDayOfWeek {
    name: string,
    id: number,
    days: Array<number>
}