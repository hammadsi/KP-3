using System.Collections;
using UnityEngine;
using TMPro;
#if UNITY_EDITOR
using UnityEditor;
#endif

[System.Serializable]
public class TimeOut : MonoBehaviour
{

    public bool HasTimedOut
{
    get { return hasTimedOut; }
}
    private GameObject timeOutCanvas;
    private TextMeshProUGUI infoText;
    private Logger loggerScript;

    private bool hasTimedOut = false;
    private bool isGamePaused = false;
    private Coroutine playTimeCoroutine;
    public int demoTimeMinutes = 10;
    private float playTimeSeconds = 0.0f;

    // Start is called before the first frame update
    void Start()
    {
        VrUIUtils uiObjectGetter = gameObject.GetComponent<VrUIUtils>();
        loggerScript = gameObject.GetComponent<Logger>();

        timeOutCanvas = uiObjectGetter.getTimeOutCanvas();
        infoText = timeOutCanvas.transform.Find("Timeout Text").gameObject.GetComponent<TextMeshProUGUI>();

        timeOutCanvas.SetActive(false);
        playTimeCoroutine = StartCoroutine(PlayTime());
    }

    IEnumerator PlayTime()
    {
        while (!hasTimedOut)
        {
            if (!isGamePaused)
            {
                playTimeSeconds += Time.deltaTime;
                if (playTimeSeconds >= demoTimeMinutes * 60)
                {
                    TimeoutReached();
                }
            }
            yield return null;
        }
    }

    private void TimeoutReached()
    {
        Time.timeScale = 0.0f;
        hasTimedOut = true;
        playTimeCoroutine = null; // No need to keep the reference as it's finished
        timeOutCanvas.SetActive(true);
        infoText.text = $"{demoTimeMinutes} minutes have elapsed!\nThanks for participating!";
        // Log any end of trial data here if needed
    }

    public void PauseGame()
    {
        isGamePaused = true;
        // Optionally stop the coroutine if you don't want it to run at all during pause
        if (playTimeCoroutine != null)
        {
            StopCoroutine(playTimeCoroutine);
        }
    }

    public void UnpauseGame()
    {
        isGamePaused = false;
        // Resume the coroutine if it was stopped
        if (playTimeCoroutine == null)
        {
            playTimeCoroutine = StartCoroutine(PlayTime());
        }
    }
}
