 //Function to create an emloyee record
 function createEmployeeRecord (arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
        
    };
 }

 //Function to create  employee records from an array of arrays
 function createEmployeeRecords (arr) {
 return arr.map(createEmployeeRecord);
 }

 //Function to create a timeIn event for an employee
 function createTimeInEvent (employee, dateTime) {
    const [date, time] = dateTime.split(' ');
    const [hour] = time.split(':');
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
 }

 //Function to create a timeOut event
  function createTimeOutEvent (employee, dateTime) {
    const [date, time] = dateTime.split(' ');
    const [hour] = time.split(':');
    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
 }

 //Function to calculate the hours worked by an emloyee on a specific date
 function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

    if(!timeInEvent || !timeOutEvent) {
    return 0;

    }
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
    const hoursWorked = (timeOutHour - timeInHour) / 100;
     return hoursWorked;
 }

 //Function to calculate the pay owed to an employee for a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const amountOwed = hoursWorked * payRate;
    return amountOwed

  }

  //Function to calculate the total pay owed for all dates worked by an employee
  function allWagesFor(employee) {
    let totalPayOwed = 0;
    const allDates = [...new Set(employee.timeInEvents.concat(employee.timeOutEvents).map(event => event.date))];

    allDates.forEach(date => {
    totalPayOwed += wagesEarnedOnDate(employee, date);

    });
    return totalPayOwed;  

  }
 // Function to calculate the total pay owed to all employees for all dates
 function calculatePayroll(employeeRecords) {
    let totalPayOwed = 0;
    employeeRecords.forEach(employee => {
        totalPayOwed += allWagesFor(employee);
    });
    return totalPayOwed;    
}
  
