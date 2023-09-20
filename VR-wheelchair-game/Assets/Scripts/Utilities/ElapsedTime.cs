using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

using TMPro;
public class ElapsedTime : MonoBehaviour
{
    public float ElapsedTimeSeconds { get { return elapsedTime; } private set { elapsedTime = value; } }
    [SerializeField]
    private float elapsedTime = 0.0f;

    private float bestTime = -1f;

    private int lapCount = 0;

    [ShowOnly] public bool timerIsRunning = false;

    private TextMeshProUGUI timerText;

    private FirebaseManager firebaseManager;

    // Start is called before the first frame update
    void Start()
    {
        VrUIUtils uiObjectGetter = gameObject.GetComponent<VrUIUtils>();
        GameObject timerCanvas = uiObjectGetter.getTimerCanvas();
        timerCanvas.SetActive(true);
        timerText = timerCanvas.transform.Find("Timer Text").gameObject.GetComponent<TMPro.TextMeshProUGUI>();
        timerIsRunning = false;

        firebaseManager = FindObjectOfType<FirebaseManager>();
    }

    public int getLapCount()
    {
        return lapCount;
    }

    public float getBestTime()
    {
        return bestTime;
    }

    // Update is called once per frame
    void Update()
    {
        if (timerIsRunning)
        {
            ElapsedTimeSeconds += Time.deltaTime;
        }
        DisplayTime(ElapsedTimeSeconds);
    }

    void DisplayTime(float timeToDisplay)
    {
        float minutes = Mathf.FloorToInt(elapsedTime / 60);
        float seconds = Mathf.FloorToInt(elapsedTime % 60);
        string timerTextContent = "";
        if (bestTime > 0.0)
        {
            float bestTimeMinutes = Mathf.FloorToInt(bestTime / 60);
            float bestTimeSeconds = Mathf.FloorToInt(bestTime % 60);
            timerTextContent += "Best: "+ string.Format("{0:00}:{1:00}", bestTimeMinutes, bestTimeSeconds) +"\n";
        }
        timerTextContent += "Current: " + string.Format("{0:00}:{1:00}", minutes, seconds);
        timerText.text = timerTextContent;
    }

    public void firstLap()
    {
        restartTimer();
        startTimer();
        return;
    }

    public void newLap()
    {
        float lapTime = restartTimer();
        if (lapTime <= 2.0f)
        {
            Debug.Log("Best time: " + bestTime);
            /* We have multiple collisions per checkpoint... */
            return;
        }
        lapCount += 1;
        Debug.Log("LapCount: " + lapCount);
        if (lapTime <= bestTime)
        {
            bestTime = lapTime;
            return;
        }

        if (bestTime < 0.0)
        {
            bestTime = lapTime;
            return;
        }
        //if (bestTime <= 10.0f)
        //{
        //    bestTime = lapTime;
        //} else
        //{
        //    if (lapTime <= bestTime)
        //    {
        //        bestTime = lapTime;
        //    }
        //}
        firebaseManager.SendLapTime(lapTime);
    }

    public void startTimer()
    {
        timerIsRunning = true;
    }

    private float restartTimer()
    {
        float timerValue = ElapsedTimeSeconds;
        ElapsedTimeSeconds = 0f;
        return timerValue;
    }
}
