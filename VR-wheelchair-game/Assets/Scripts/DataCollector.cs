using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using ExciteOMeter;
using System;

public class DataCollector : MonoBehaviour
{
    private GameSession gameSession;
    public float heartRateInterval = 1.0f; // Interval time in seconds

    private void Start()
    {
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
    }

    public void AddLapData(float lapTime)
    {
        Lap newLap = new Lap { lapTime = lapTime, timestamp = DateTime.UtcNow.ToString("o") };
        gameSession.laps.Add(newLap);
        Debug.Log("Printing gameSession laps: ");
        foreach (Lap lap in gameSession.laps)
        {
            Debug.Log(lap); // Calls lap.ToString() implicitly
        }  
    }

    private IEnumerator CollectHeartRate()
    {
        while (true)
        {
            float heartRate = ReactInletUI.currentHeartRate;

            HeartRateData newData = new HeartRateData { heartRate = (int)heartRate, timestamp = DateTime.UtcNow.ToString("o") };
            gameSession.timeSeriesData.heartRates.Add(newData);

            yield return new WaitForSeconds(heartRateInterval); // Wait for the defined interval
        }
    }


    private void OnApplicationQuit()
    {
        // Stop the heart rate collection coroutine
        StopCoroutine(CollectHeartRate());

        // Send gameSession to API
        SendDataToAPI();
    }

    private void SendDataToAPI()
    {
        // Logic to send gameSession to API
        // Serialize gameSession to JSON and then send to API
    }
}
