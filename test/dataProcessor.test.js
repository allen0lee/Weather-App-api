const expect = require('chai').expect
const dataProcessor = require('../lib/dataProcessor')

describe('check dataProcessor', () => {
  it('should throw an exception if invalid data is passed', () => {
      expect(()=>{dataProcessor.processWeatherData({})}).to.throw('Invalid Data')
  })
})
