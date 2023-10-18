using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ApiManager : MonoBehaviour
{
    private string apiUrl = "http://localhost:8000/api";
    public string patientID;
    public string bearerToken;  

    void Start()
    {
        // Set your bearer token here

        // Example of sending a GET request to fetch patient data
        StartCoroutine(GetRequest(apiUrl + "/patients/" + patientID, bearerToken));
    }

    IEnumerator GetRequest(string uri, string bearerToken)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
            // Set the Authorization header with the bearer token
            webRequest.SetRequestHeader("Authorization", "Bearer " + bearerToken);

            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.ConnectionError)
            {
                Debug.Log(": Error: " + webRequest.error);
            }
            else
            {
                // Process the received patient data
                ProcessPatientData(webRequest.downloadHandler.text);
            }
        }
    }

    void ProcessPatientData(string jsonData)
    {
        // Parse the received JSON data to extract patient information
        // You might need to use a JSON parsing library, or define a serializable class that matches the structure of the data
        // This is a placeholder; replace it with actual data processing logic
        Debug.Log("Received Patient Data: " + jsonData);
        
        // Once data is processed, you can use it within your Unity application as needed
    }
}
