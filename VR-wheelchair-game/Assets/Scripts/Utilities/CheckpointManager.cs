using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CheckpointManager : MonoBehaviour
{
    private List<bool> hasReachedCheckpoint;
    public GameObject timerObject;
    ElapsedTime elapsedTimeScript;
    public bool firstLap = true;

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
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private bool hasCompletedLap()
    {
        for (int i = 0; i < hasReachedCheckpoint.Count; i++)
        {
            if (hasReachedCheckpoint[i] == false) return false;
        }
        return true;
    }

    private void clearCheckpoints()
    {
        for (int i = 0; i < hasReachedCheckpoint.Count; i++)
        {
            hasReachedCheckpoint[i] = false;
        }
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
            hasReachedCheckpoint[checkPointIndex] = true;
            if (firstLap) {
                Debug.Log("First lap");
                elapsedTimeScript.firstLap();
                firstLap = false;
            } else {
                if (hasCompletedLap())
                {
                    Debug.Log("Lap completed");
                    elapsedTimeScript.newLap();
                }
            }
            clearCheckpoints();
        }
        hasReachedCheckpoint[checkPointIndex] = true;
    }
}
