using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

public class CheckpointManager : MonoBehaviour
{
    private List<bool> hasReachedCheckpoint;
    public GameObject timerObject;
    ElapsedTime elapsedTimeScript;
    public bool firstLap = true;
    private float coolDownTime = 1.0f; // Set an appropriate cool down time
    private float lastLapTime;



    // Start is called before the first frame update
    void Start()
    {
        elapsedTimeScript = timerObject.GetComponent<ElapsedTime>();

        int numChildren = gameObject.transform.childCount;
        //int numChildren = 2;
        hasReachedCheckpoint = new List<bool>(numChildren);
        for (int i = 0; i < numChildren; i++)
        {
            hasReachedCheckpoint.Add(false);
        }      
        clearCheckpoints();
        lastLapTime = Time.time;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private bool hasCompletedLap()
    {
        return hasReachedCheckpoint.All(status => status == true); // Check if all checkpoints are reached
    }

    private void clearCheckpoints()
    {
        Debug.Log("Clearing checkpoints");
        for (int i = 0; i < hasReachedCheckpoint.Count; i++)
        {
            hasReachedCheckpoint[i] = false;
        }
        printCheckpoints(); // Print the status after clearing to ensure it's cleared
    }

    private void printCheckpoints()
    {
        string checkpointStatusString = "Checkpoint status: ";
        Debug.Log("Checkpoint list count : " + hasReachedCheckpoint.Count);
        for (int i = 0; i < hasReachedCheckpoint.Count; i++)
        {
            if (hasReachedCheckpoint[i]) checkpointStatusString += "1, ";
            else checkpointStatusString += "0, ";
        }
        Debug.Log(checkpointStatusString);
    }


    public void checkpointReached(int checkPointIndex)
    {
        Debug.Log("Checkpoint " + checkPointIndex + " reached");

        printCheckpoints();
        if (checkPointIndex == 0)
        {
            if (firstLap) 
            {
                Debug.Log("First lap");
                elapsedTimeScript.firstLap();
                firstLap = false;
            } 
            else 
            {
                if (hasCompletedLap() && Time.time - lastLapTime >= coolDownTime)
                {
                    Debug.Log("Lap completed");
                    elapsedTimeScript.newLap();
                    lastLapTime = Time.time; // Update last lap time after lap completion

                }
            }
            clearCheckpoints();
        }
        hasReachedCheckpoint[checkPointIndex] = true;

    }
}