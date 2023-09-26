using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

[System.Serializable]
public class LapAndHeartRateData
{
    public float lapTime;
    public float heartRate;

    public LapAndHeartRateData(float lapTime, float heartRate)
    {
        this.lapTime = lapTime;
        this.heartRate = heartRate;
    }
}




public class FirebaseManager : MonoBehaviour {
    private string databaseURL = "https://digiboard-abbfe-default-rtdb.europe-west1.firebasedatabase.app/";

    // Send data to Firebase
    public void SendData(string path, string jsonData) {
        // Use UnityWebRequest to send jsonData to Firebase at the specified path
    }

    // Retrieve data from Firebase
    //public IEnumerator GetData(string path, System.Action<string> callback) {
        // Use UnityWebRequest to get data from Firebase at the specified path
        // Invoke the callback with the retrieved data
    //}

    // Function to send lap time to Firebase
    public void SendLapAndHeartRate(float lapTime, float heartRate) 
    {
        string path = "lapTimes/user123.json";
        LapAndHeartRateData data = new LapAndHeartRateData(lapTime, heartRate);
        string jsonData = JsonUtility.ToJson(data);
        StartCoroutine(PushToDatabase(path, jsonData));
    }


    private IEnumerator PushToDatabase(string path, string jsonData) {
        Debug.Log("Push to database method");
        string fullPath = databaseURL + path;
        UnityWebRequest request = UnityWebRequest.Put(fullPath, jsonData);
        request.method = UnityWebRequest.kHttpVerbPOST;
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError) {
            Debug.LogError("Error: " + request.error);
        } else {
            Debug.Log("Lap time sent successfully!");
        }
        Debug.Log(jsonData);
    }

    // Other Firebase functions as needed...
}