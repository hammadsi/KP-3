type PatientsType = {
    patients: [{
        patientId: Number,
        personalInfo: {
            // ...
        },
        gameSessions: [{
            sessionId: Number,
            sessionInfo: {
                exerciseTime: Number,
                startTime: Date,
                endTime: Date,
                performanceMetrics: {
                    // ...
                },
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
                    speed: Number,
                    timestamp: Date,
                }]
            }]
        }],
    }]
};