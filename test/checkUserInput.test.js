const expect = require('chai').expect
const checkUserInput = require('../public/lib/checkUserInput').checkUserInput

describe('check user input', () => {
  it('should return false if input is empty', () => {
		expect(checkUserInput('')).to.be.equal(false)
  })
  it('should return false if input only has space', () => {
		expect(checkUserInput('  ')).to.be.equal(false)
  })
  it('should return false if input is is number only', () => {
		expect(checkUserInput('123')).to.be.equal(false)
  })
  it('should return false if input is is symbol only', () => {
		expect(checkUserInput('!@#$')).to.be.equal(false)
  })
  it('should return true if input is validate', () => {
		expect(checkUserInput('Hello world')).to.be.equal(true)
  })
})
