using System.Collections;
using System.Collections.Generic;
using System;
using System.Globalization;
using UnityEngine;

// File system stuff
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

public class Logger : MonoBehaviour
{
    public bool saveData = false;
    public string outputFileName;
    public GameObject player;

    //[ShowOnly]
    //public float TotalMovement = 0.0f;

    //[ShowOnly]
    //public float TotalRotation = 0.0f;

    private string filePath;
    private PlayerMovement movement_script;
    private ElapsedTime elapsedTimeScript;
    // Start is called before the first frame update
    void Start()
    {
        // Create file name
        string currentTime = getCurrentTime();
        Debug.Log("Start time: " + currentTime);

        filePath = "Assets/Recorded_Data/game_data_" + outputFileName + "_" + currentTime + ".csv";
        if (saveData)
        {
            Debug.Log("Saving logging data to path: " + filePath);
        }
        else
        {
            Debug.Log("Not logging data.");
        }

        elapsedTimeScript = gameObject.GetComponent<ElapsedTime>();
        movement_script = player.GetComponent<PlayerMovement>();
        InvokeRepeating("logNewLine", 0.0f, 1.0f);
    }


    private string getCurrentTime()
    {
        DateTime currentTime = DateTime.Now;
        var culture = new CultureInfo("nb-NO");
        return currentTime.ToString(culture);
    }

    private long getCurrentTimeUnixSeconds()
    {
        long currentTime = DateTimeOffset.Now.ToUnixTimeSeconds();
        return currentTime;
    }   
    private void logNewLine()
    {
        if (!File.Exists(filePath))
        {
            string infoLine = "maxVelocity:" + movement_script.maxVelocity + ",maxTurn:" + movement_script.maxTurn + "\n";
            string header = "time (UNIX seconds),cumulative movement,cumulative rotation,lap number\n";
            writeLineToFile(infoLine);
            writeLineToFile(header);
        }
        string data = getCurrentTimeUnixSeconds() +","+ Mathf.RoundToInt(GetTotalMovement()) + "," + Mathf.RoundToInt(GetTotalRotation()) + "," + elapsedTimeScript.getLapCount() +"\n";
        writeLineToFile(data);
    }

    private void writeLineToFile(string line)
    {
        if (!saveData) return;
        File.AppendAllText(filePath, line);
    }

    public void LogEndOfTrial(int elapsedTime)
    {
        logNewLine();
        string line = "Trial ended. Best lap time:" + elapsedTimeScript.getBestTime() + "," + "total elapsed time:" + elapsedTime;
        writeLineToFile(line);
        saveData = false;
    }

    public float GetTotalMovement()
    {
        return movement_script.TotalMovement;
    }
    public float GetTotalRotation()
    {
        return movement_script.TotalTurnedDegrees;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
