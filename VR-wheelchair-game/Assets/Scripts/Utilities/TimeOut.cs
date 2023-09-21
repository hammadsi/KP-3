using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

using TMPro;


// File system stuff
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
#if UNITY_EDITOR
using UnityEditor;
#endif

[System.Serializable]
public class TimeOut : MonoBehaviour
{
    private GameObject timeOutCanvas;
    private TextMeshProUGUI infoText;
    private Logger loggerScript;

    private bool hasTimedOut = false;

    public int demoTimeMinutes = 10;
    public float playTimeMinutes = 0.0f;
    private float loadTimeSeconds;

    // Start is called before the first frame update
    void Start()
    {
        VrUIUtils uiObjectGetter = gameObject.GetComponent<VrUIUtils>();
        loggerScript = gameObject.GetComponent<Logger>();

        timeOutCanvas = uiObjectGetter.getTimeOutCanvas();
        infoText = timeOutCanvas.transform.Find("Timeout Text").gameObject.GetComponent<TMPro.TextMeshProUGUI>();
        loadTimeSeconds = Time.realtimeSinceStartup;
        
        #if UNITY_EDITOR
        EditorApplication.playModeStateChanged += onPlayModeStateChange;
        #endif

        timeOutCanvas.SetActive(false);
        StartCoroutine(PlayTime());
    }

#if UNITY_EDITOR
    private void onPlayModeStateChange(PlayModeStateChange state)
    {
        if (state == PlayModeStateChange.ExitingPlayMode)
        {
            PrematureQuit();
            Debug.Log("Exited play mode!!!");
        }
    }
#endif
    void PrematureQuit()
    {
        if (hasTimedOut) return;
        float elapsedTime = Time.realtimeSinceStartup- loadTimeSeconds;
        float elapsedMinutes = Mathf.FloorToInt(elapsedTime / 60);
        float elapsedSeconds = Mathf.FloorToInt(elapsedTime % 60);
        //float elapsedTime = Time.unscaledTime - startTime;
        Debug.Log("Elapsed time: " + elapsedMinutes + " minutes " + elapsedSeconds + " seconds");
        loggerScript.LogEndOfTrial(Mathf.RoundToInt(elapsedTime));
    }

    IEnumerator PlayTime()
    {
        //yield return new WaitForSeconds(5);
        yield return new WaitForSeconds(demoTimeMinutes*60);
        Time.timeScale = 0.0f;
        hasTimedOut = true;
        timeOutCanvas.SetActive(true);
        infoText.text = demoTimeMinutes + " minutes have elapsed!\nThanks for participating!";
        //infoText.text = "15 minutes have elapsed!\n<b>Write down the following:</b>\n\nTotal Movement: " + Mathf.RoundToInt(loggerScript.GetTotalMovement()) + "\nTotal Rotation: " + Mathf.RoundToInt(loggerScript.GetTotalRotation());
        Debug.Log("Timeout at " + (Time.realtimeSinceStartup- loadTimeSeconds));
        Debug.Log("Total Movement: " + Mathf.RoundToInt(loggerScript.GetTotalMovement()));
        Debug.Log("Total Rotation: " + Mathf.RoundToInt(loggerScript.GetTotalRotation()));
        loggerScript.LogEndOfTrial(60*demoTimeMinutes);
        //yield return new WaitForSeconds(60 * 15); // 15 minutes

    }


    // Update is called once per frame
    void Update()
    {
        float elapsedTime = Time.realtimeSinceStartup - loadTimeSeconds;
        playTimeMinutes = elapsedTime / 60.0f;
    }
}
