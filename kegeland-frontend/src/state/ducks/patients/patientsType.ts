type PatientsType = {
    patients: [{
        patientId: String,
        name: String,
        age: Number,
        gender: 'M' | 'F' | 'O',
        currentPhysicalState: {
            height: Number,
            weight: Number,
            maxHeartRate: Number,
            averageHeartRate: Number,
            maxWheelchairSpeed: Number,
            averageWheelchairSpeed: Number,
        },
        gameSessions: [{
            sessionId: String,
            //exerciseTime should be calcuated from startTime and endTime
            exerciseTime: Number,
            startTime: Date,
            endTime: Date,
            performanceMetrics: {
                // ...
            },
            laps: [{
                lapId: Number,
                lapTime: Number,
            }],
            timeSeriesData: [{
                heartRates: [{
                    heartRate: Number,
                    timestamp: Date,
                }],
                speeds: [{
                    leftSpeed: Number,
                    rightSpeed: Number,
                    timestamp: Date,
                }],
                imus: [{
                    // ...
                }],
            }],
            questionaires: [{
                before: any, // not any, but find out what type
                after: any, // not any, but find out what type
            }],
        }],
    }]
};