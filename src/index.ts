interface Options {
  url: string
}

export default class Apron {
  options: Options
  constructor(options: Options) {
    this.options = options
  }
}
