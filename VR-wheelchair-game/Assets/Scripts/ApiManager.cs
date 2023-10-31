using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ApiManager : MonoBehaviour
{
    private string apiUrl = "http://localhost:8000/api/wheelchairPatients";
    public string patientID;
    public string bearerToken;

    void Start()
    {
        if (string.IsNullOrEmpty(bearerToken))
        {
            Debug.LogError("Bearer token is not set!");
            return;
        }

        // Example of sending a GET request to fetch patient data
        StartCoroutine(GetRequest(new System.Uri($"{apiUrl}/wheelchairPatients/{patientID}")));
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
            Debug.LogError("Error: " + webRequest.error);
        }
        else if (webRequest.responseCode >= 200 && webRequest.responseCode < 300)
        {
            Debug.Log("Response: " + webRequest.downloadHandler.text);
            ProcessResponse(webRequest.downloadHandler.text);
        }
        else
        {
            Debug.LogError("HTTP Error: " + webRequest.responseCode);
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
}
