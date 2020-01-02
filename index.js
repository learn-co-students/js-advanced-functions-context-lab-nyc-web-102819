/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(emloyee) {
    return {
        firstName: emloyee[0],
        familyName: emloyee[1],
        title: emloyee[2],
        payPerHour: emloyee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(dateTime) {
    let dateTimeArr = dateTime.split(' ')
    let date = dateTimeArr[0]
    let hour = parseInt(dateTimeArr[1])
    let type = 'TimeIn'
    let event = { date, hour, type }

    this.timeInEvents.push(event)

    return this
}

function createTimeOutEvent(dateTime) {
    let dateTimeArr = dateTime.split(' ')
    let date = dateTimeArr[0]
    let hour = parseInt(dateTimeArr[1])
    let type = 'TimeOut'
    let event = { date, hour, type }

    this.timeOutEvents.push(event)

    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date)
    let timeOut = this.timeOutEvents.find(event => event.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
}

function allWagesFor() {
    return this.timeInEvents.reduce(function(totalWages, event){
        return totalWages + wagesEarnedOnDate.call(this, event.date)
    }, 0)
}

function calculatePayroll(records) {
    return records.reduce(function(payroll, record){
        let employeeWages = allWagesFor.call(record)
        return payroll + employeeWages
    }, 0)
}

function findEmployeeByFirstName(records, name) {
    return records.find(record => record.firstName === name)
}