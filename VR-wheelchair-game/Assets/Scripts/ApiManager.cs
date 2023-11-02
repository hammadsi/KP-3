using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ApiManager : MonoBehaviour
{
    private string apiUrl = "http://localhost:8000/api/wheelchairPatients";
    public string patientID;
    public string bearerToken;

    public string sessionId;
    LogManager logManager;

    void Start()
    {
        logManager = FindObjectOfType<LogManager>();
        logManager.Log("User ID: " + patientID);
        logManager.Log("Game Session ID: " + sessionId);
        logManager.Log("Bearer Token: " + bearerToken);
        if (string.IsNullOrEmpty(bearerToken))
        {
            Debug.LogError("Bearer token is not set!");
            return;
        }

        // Example of sending a GET request to fetch patient data
        //StartCoroutine(GetRequest(new System.Uri($"{apiUrl}/wheelchairPatients/{patientID}")));
    }

    private void SetCommonHeaders(UnityWebRequest webRequest)
    {
        webRequest.SetRequestHeader("Content-Type", "application/json");
        webRequest.SetRequestHeader("Authorization", "Bearer " + bearerToken);
    }

    IEnumerator GetRequest(System.Uri uri)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
            SetCommonHeaders(webRequest);
            yield return webRequest.SendWebRequest();
            HandleResponse(webRequest);
        }
    }

    public IEnumerator PostRequest(System.Uri uri, string jsonData)
    {
        logManager.Log("Sending POST request to: " + uri.ToString());
        logManager.Log("Data: " + jsonData);
        using (UnityWebRequest webRequest = new UnityWebRequest(uri, "POST"))
        {
            byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(jsonData);
            webRequest.uploadHandler = (UploadHandler) new UploadHandlerRaw(bodyRaw);
            webRequest.downloadHandler = (DownloadHandler) new DownloadHandlerBuffer();
            SetCommonHeaders(webRequest);
            yield return webRequest.SendWebRequest();
            HandleResponse(webRequest);
        }
    }

    public IEnumerator PutRequest(System.Uri uri, string jsonData)
    {
        logManager.Log("Sending PUT request to: " + uri.ToString());
        logManager.Log("Data: " + jsonData);
        using (UnityWebRequest webRequest = new UnityWebRequest(uri, "PUT"))
        {
            byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(jsonData);
            webRequest.uploadHandler = (UploadHandler) new UploadHandlerRaw(bodyRaw);
            webRequest.downloadHandler = (DownloadHandler) new DownloadHandlerBuffer();
            SetCommonHeaders(webRequest);
            yield return webRequest.SendWebRequest();
            HandleResponse(webRequest);
        }
    }

    private void HandleResponse(UnityWebRequest webRequest)
    {
        if (webRequest.result == UnityWebRequest.Result.ConnectionError)
        {
            logManager.LogError("Error: " + webRequest.error);
        }
        else if (webRequest.responseCode >= 200 && webRequest.responseCode < 300)
        {
            logManager.Log("Response: " + webRequest.downloadHandler.text);
            ProcessResponse(webRequest.downloadHandler.text);
        }
        else
        {
            logManager.LogError("HTTP Error: " + webRequest.responseCode);
        }
    }

    protected virtual void ProcessResponse(string responseText)
    {
        // Override this method in derived classes to process the response text
    }

    public IEnumerator UpdatePatientData(string patientId, string jsonData)
    {
        System.Uri uri = new System.Uri($"{apiUrl}/{patientId}");
        yield return PutRequest(uri, jsonData);
    }

    public IEnumerator AddEmptyGameSession(string patientId)
    {
        System.Uri uri = new System.Uri($"{apiUrl}/{patientId}/gameSessions");
        yield return PostRequest(uri, "{}"); // Sending an empty JSON object as the body
    }

    public IEnumerator UpdateGameSession(string patientId, string sessionId, string jsonData)
    {
        System.Uri uri = new System.Uri($"{apiUrl}/{patientId}/gameSessions/{sessionId}");
        yield return PutRequest(uri, jsonData);
    }

    public IEnumerator addHeartRateToGameSession(string patientId, string sessionId, HeartRateData heartRateData) 
    {
        string uri = $"{apiUrl}/{patientId}/gameSessions/{sessionId}/heartRate";
        string jsonData = JsonUtility.ToJson(heartRateData);
        yield return PostRequest(new Uri(uri), jsonData);
    }

    public IEnumerator AddWheelSpeedToGameSession(string patientId, string sessionId, SpeedData speedData) 
    {
        string uri = $"{apiUrl}/{patientId}/gameSessions/{sessionId}/speed";
        string jsonData = JsonUtility.ToJson(speedData);
        yield return PostRequest(new Uri(uri), jsonData);
    }

    public IEnumerator AddLapToGameSession(string patientId, string sessionId, Lap lapData) 
    {
        string uri = $"{apiUrl}/{patientId}/gameSessions/{sessionId}/lap";
        string jsonData = JsonUtility.ToJson(lapData);
        yield return PostRequest(new Uri(uri), jsonData);
    }

}


