using System;
using System.Collections.Generic;

[Serializable]
public class GameSession
{
    public int exerciseTime;
    public string startTime;
    public string endTime;
    public List<Lap> laps;
    public TimeSeriesData timeSeriesData;
}


[Serializable]
public class Lap
{
    public float lapTime { get; set; }
    public string timestamp { get; set; }

    public override string ToString()
    {
        return $"Lap Time: {lapTime}, Timestamp: {timestamp}";
    }
}

[Serializable]
public class TimeSeriesData
{
    public List<HeartRateData> heartRates;
    public List<SpeedData> speeds;
    public List<IMUData> IMUs;
}

[Serializable]
public class HeartRateData
{
    public int heartRate;
    public string timestamp;
    public override string ToString()
    {
        return $"HR: {heartRate}, Timestamp: {timestamp}";
    }
}

[Serializable]
public class SpeedData
{
    public float leftSpeed;
    public float rightSpeed;
    public string timestamp;
}

[Serializable]
public class IMUData
{
    public string imuData1;
    public string imuData2;
}
