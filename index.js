/* Your Code Here */
function createEmployeeRecord(array){

    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents: [],
        timeOutEvents:[]
}

}

function createEmployeeRecords (recordsArray){
    return recordsArray.map(rec=>createEmployeeRecord(rec))
}

function createTimeInEvent(recordObj, timestamp){
    const [date , time] = timestamp.split(' ')
    const timeIn = {
        type:'TimeIn',
        hour:parseInt(time),
        date: date
    }
    recordObj.timeInEvents.push(timeIn)
    return recordObj
 }

 function createTimeOutEvent(recordObj, timestamp){
    const [date , time] = timestamp.split(' ')
    const timeOut = {
        type:'TimeOut',
        hour:parseInt(time),
        date: date
    }
    recordObj.timeOutEvents.push(timeOut)
    return recordObj
 }

 function hoursWorkedOnDate(employeeObj, datestamp){
     const timeIn = employeeObj.timeInEvents.find(inEvent=>inEvent.date === datestamp);
     const timeOut = employeeObj.timeOutEvents.find(outEvent=>outEvent.date === datestamp);
     return (timeOut.hour - timeIn.hour)/100
 }

 function wagesEarnedOnDate(employeeObj, datestamp){
    const timeIn = employeeObj.timeInEvents.find(inEvent=>inEvent.date === datestamp);
    const timeOut = employeeObj.timeOutEvents.find(outEvent=>outEvent.date === datestamp);
    const payRate = employeeObj.payPerHour
    return [(timeOut.hour - timeIn.hour)/100]*payRate
}

// for(let i =0;i<inEvents.length; i++)
// {let eventDates = (bpRecord.timeInEvents[i].date)
// console.log(eventDates)}

function allWagesFor1(employeeObj){
    let hoursWorked =[] 
    let totalHours
    for(let i =0;i<employeeObj.timeInEvents.length; i++)

    if(employeeObj.timeInEvents[i].date === employeeObj.timeOutEvents[i].date){
        hoursWorked.push((employeeObj.timeOutEvents[i].hour-employeeObj.timeInEvents[i].hour)/100)
    };
     totalHours = hoursWorked.reduce((a, b) => {
        return (a + b);
      })
      return totalHours*employeeObj.payPerHour

}

function calculatePayroll(recordsArray){
    let employeeWages = []
    let payrollCost=

    recordsArray.forEach(element=>employeeWages.push(allWagesFor(element)));
    payrollCost = employeeWages.reduce((a, b) => {
        return (a + b);
      })
      return payrollCost


}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}