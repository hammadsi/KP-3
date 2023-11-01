using System.IO;
using UnityEngine;

public class LogManager : MonoBehaviour
{
    private string logFilePath;

    void Start()
    {
        logFilePath = Path.Combine(Application.persistentDataPath, "debug_logs.txt");
        Debug.Log("Logs are being saved to: " + logFilePath);
    }

    public void Log(string message)
    {
        Debug.Log(message);
        File.AppendAllText(logFilePath, message + "\n");
    }

    public void LogError(string message)
    {
        Debug.LogError(message);
        File.AppendAllText(logFilePath, "ERROR: " + message + "\n");
    }
}
