using UnityEngine;
using UnityEngine.UI;

public class ParameterHandler : MonoBehaviour
{
    public Text debugText;
    void Start()
    {
        string[] args = System.Environment.GetCommandLineArgs();
        string url = "";

        if (args.Length > 1)
        {
            url = args[1];  // Assuming the URL is the first argument
        }

        string patientID = ParseUrlParameter(url, "patientId");
        string bearerToken = ParseUrlParameter(url, "bearerToken");

        if (!string.IsNullOrEmpty(patientID) && !string.IsNullOrEmpty(bearerToken))
        {
            ApiManager apiManager = FindObjectOfType<ApiManager>();
            if (apiManager != null)
            {
                apiManager.patientID = patientID;
                apiManager.bearerToken = bearerToken;
                debugText.gameObject.SetActive(false);
            }
            else
            {
                Debug.LogError("ApiManager not found in scene!");
            }
        }
        else
        {
            debugText.text = "Required parameters not found";
            Debug.LogError("Required parameters not provided!");
        }
    }

    string ParseUrlParameter(string url, string parameterName)
    {
        string pattern = parameterName + "=(.*?)(&|$)";
        var match = System.Text.RegularExpressions.Regex.Match(url, pattern);
        if (match.Success)
        {
            return match.Groups[1].Value;
        }
        return "";
    }
}
