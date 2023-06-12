var config = {
    "timeFrameBundle": [
        {
            "label": 1,
            "factor": 1.5,
            "id": 1
        },
        {
            "label": 3,
            "factor": 1.15,
            "id": 2
        },
        {
            "label": 6,
            "factor": 1,
            "id": 3
        },
        {
            "label": 12,
            "factor": 0.88,
            "id": 4
        }
    ], // used
    "expertise": [
        {
            "label": "Amateur",
            "value": 7
        },
        {
            "label": "Professional",
            "value": 8.5
        },
        {
            "label": "Expert",
            "value": 10
        }
    ], //used
    "type": [
        {
            "label": "Fixed",
            "value": 1
        },
        {
            "label": "Recursive",
            "value": 2
        }
    ], //used
    "approx_Days": [
        {
            "greaterThan": 0,
            "lessThan": 10,
            "divideValDays": 2
        },
        {
            "greaterThan": 10,
            "lessThan": 40,
            "divideValDays": 3
        },
        {
            "greaterThan": 40,
            "lessThan": 100,
            "divideValDays": 4
        },
        {
            "greaterThan": 100,
            "lessThan": 5000,
            "divideValDays": 5
        }
    ], //used
    "hourlyCalculation": {
        weeklyhours: {
            "min": 5,
            "max": 40
        },
        timeFrameInWeeks: {
            "min": 1,
            "max": 52
        }
    }, //used
    "resourcesCalculation": {
        resources: {
            "min": 1,
            "max": 20
        },
        timeFrameInMonths: {
            "min": 1,
            "max": 12
        }
    }, //used
    "usersCount": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //used
}
module.exports = config;
