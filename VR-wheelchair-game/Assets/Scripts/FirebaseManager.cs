using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class FirebaseManager : MonoBehaviour {
    private string databaseURL = "https://test-unity-kundestyrt.firebaseio.com/";

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
    public void SendLapTime(float lapTime) {
        string path = "lapTimes/user123.json"; // Change the path as needed (e.g., different paths for different users)
        string jsonData = JsonUtility.ToJson(new { lapTime = lapTime });

        StartCoroutine(PushToDatabase(path, jsonData));
    }

    private IEnumerator PushToDatabase(string path, string jsonData) {
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
    }

    // Other Firebase functions as needed...
}