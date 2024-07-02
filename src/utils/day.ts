const MS_DAY = 1000 * 60 * 60 * 24

export default class Day {
  date: Date
  mapping: {
    YYYY: string
    MM: string
    dd: string
    hh: string
    mm: string
  }

  constructor(date?: string | number | Date) {
    this.date = date ? new Date(date) : new Date()
    this.mapping = {
      YYYY: this.date.getFullYear().toString(),
      MM: this.padZero(this.date.getMonth() + 1).toString(),
      dd: this.padZero(this.date.getDate()),
      hh: this.padZero(this.date.getHours() % 12),
      mm: this.padZero(this.date.getMinutes()),
    }
  }
  private padZero(n: number, digits = 2): string {
    const str = n.toString()
    return str.length < digits ? ('0'.repeat(digits) + str).slice(-digits) : str
  }

  /**
   * @description reference by https://day.js.org/docs/en/display/format
   */
  format = (format = 'YYYY/MM/DD hh:mm'): string => {
    return Object.entries(this.mapping).reduce((prev, cur) => {
      const [key, func] = cur
      return prev.includes(key) ? prev.replace(key, func) : prev
    }, format)
  }

  setDay = (number: number): Day => {
    return new Day(this.date.valueOf() + MS_DAY * number)
  }

}