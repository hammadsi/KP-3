using UnityEngine;
using UnityEngine.UI;

public class ParameterHandler : MonoBehaviour
{
    public Text debugText;  // Drag your Text object here in the inspector

    void Start()
    {
        string[] args = System.Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++)
        {
            if (args[i] == "-patientID" && i + 1 < args.Length)
            {
                string patientID = args[i + 1];
                debugText.text = "Patient ID: " + patientID;
                return;  // Exit the Start method since we found the parameter
            }
        }
        debugText.text = "No parameters found";
    }
}
