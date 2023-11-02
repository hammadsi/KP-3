using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using ExciteOMeter;
using System;

public class DataCollector : MonoBehaviour
{
    private GameSession gameSession;
    public float heartRateInterval = 1.0f; // Interval time in seconds
    public float wheelSpeedInterval = 1.0f; // Interval time in seconds
    private ApiManager apiManager;


    private void Start()
    {
        apiManager = FindObjectOfType<ApiManager>();
        gameSession = new GameSession();
        gameSession.laps = new List<Lap>();
        gameSession.timeSeriesData = new TimeSeriesData
        {
            heartRates = new List<HeartRateData>(),
            speeds = new List<SpeedData>(),
            IMUs = new List<IMUData>()
        };

        gameSession.startTime = DateTime.UtcNow.ToString("o"); // Using ISO 8601 format
        StartCoroutine(CollectHeartRate());
        StartCoroutine(CollectWheelSpeeds());
    }

    public void AddLapData(float lapTime)
    {
        Lap newLap = new Lap { lapTime = lapTime, timestamp = DateTime.UtcNow.ToString("o") };
        gameSession.laps.Add(newLap);
        string lapJsonData = JsonUtility.ToJson(newLap);
        StartCoroutine(apiManager.AddLapToGameSession(apiManager.patientID, apiManager.sessionId, newLap));    
    }

    IEnumerator CollectHeartRate() {
      while (true) {
        float heartRate = ReactInletUI.currentHeartRate;
        HeartRateData newData = new HeartRateData { heartRate = (int)heartRate, timestamp = DateTime.UtcNow.ToString("o") };
        gameSession.timeSeriesData.heartRates.Add(newData);

        // Update heart rate in API
        StartCoroutine(apiManager.addHeartRateToGameSession(apiManager.patientID, apiManager.sessionId, newData));

        yield return new WaitForSeconds(heartRateInterval);
      }
    }

    IEnumerator CollectWheelSpeeds() {
        while (true) {
            SpeedData newSpeedData = new SpeedData {
                leftSpeed = UnityEngine.Random.Range(0f, 10f), // Random speed for left wheel
                rightSpeed = UnityEngine.Random.Range(0f, 10f), // Random speed for right wheel
                timestamp = DateTime.UtcNow.ToString("o")
            };
            gameSession.timeSeriesData.speeds.Add(newSpeedData);
            StartCoroutine(apiManager.AddWheelSpeedToGameSession(apiManager.patientID, apiManager.sessionId, newSpeedData));
            // Here you can also send the wheel speed data to the API if needed

            yield return new WaitForSeconds(wheelSpeedInterval);
        }
    }


    private void OnApplicationQuit()
    {
        //SendDataToAPI();
    }

private void SendDataToAPI()
{
    string gameSessionJson = JsonUtility.ToJson(gameSession);
    StartCoroutine(apiManager.UpdateGameSession(apiManager.patientID, apiManager.sessionId, gameSessionJson));
}

}