using UnityEngine;
using UnityEngine.UI;

public class ParameterHandler : MonoBehaviour
{
    public Text debugText;  // Drag your Text object here in the inspector

    void Start()
    {
        string[] args = System.Environment.GetCommandLineArgs();
        string patientID = "";
        string bearerToken = "";

        for (int i = 0; i < args.Length; i++)
        {
            if (args[i] == "-patientID" && i + 1 < args.Length)
            {
                patientID = args[i + 1];
                debugText.text = "Patient ID: " + patientID;
            }
            else if (args[i] == "-bearerToken" && i + 1 < args.Length)
            {
                bearerToken = args[i + 1];
            }
        }

        // Check if both parameters are found
        if (!string.IsNullOrEmpty(patientID) && !string.IsNullOrEmpty(bearerToken))
        {
            ApiManager apiManager = FindObjectOfType<ApiManager>();
            if (apiManager != null)
            {
                apiManager.patientID = patientID;
                apiManager.bearerToken = bearerToken;
            }
            else
            {
                Debug.LogError("ApiManager not found in scene!");
            }
        }
        else
        {
            debugText.text = "Required parameters not found";
            Debug.LogError("Required command line parameters not provided!");
        }
    }
}
