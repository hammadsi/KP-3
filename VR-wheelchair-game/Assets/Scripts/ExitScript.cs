using UnityEngine;

public class ExitScript : MonoBehaviour
{
    public GameObject exitPromptPanel; // Assign this in the Inspector
    public GameObject vrControllers; // Assign the GameObject that contains the VR controllers
    public VrUIUtils vrUIUtils; // Assign the VrUIUtils script here in the Inspector

    private GameObject currentTimerCanvas;
    private GameObject currentTimeOutCanvas;

    private void Start()
    {
        // Cache the current timer and timeout canvases at start
        currentTimerCanvas = vrUIUtils.getTimerCanvas();
        currentTimeOutCanvas = vrUIUtils.getTimeOutCanvas();
    }

    private void Update()
    {
        // Detect if the Escape key is pressed
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            TogglePauseGame();
        }
    }

    private void TogglePauseGame()
    {
        if (exitPromptPanel.activeInHierarchy)
        {
            ContinueGame();
        }
        else
        {
            PauseGame();
        }
    }

    private void PauseGame()
    {
        exitPromptPanel.SetActive(true);
        Time.timeScale = 0; // Pause the game time
        if (vrControllers) vrControllers.SetActive(false); // Disable VR controllers

        // Unlock the cursor so the player can click UI buttons
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    public void ContinueGame()
    {
        exitPromptPanel.SetActive(false);
        Time.timeScale = 1; // Resume the game time
        if (vrControllers) vrControllers.SetActive(true); // Enable VR controllers
        if (currentTimerCanvas) currentTimerCanvas.SetActive(true); // Show the timer canvas

        // Check if the timeout has occurred before showing the timeout canvas
        TimeOut timeOutScript = vrUIUtils.GetComponent<TimeOut>();
        if (timeOutScript && timeOutScript.HasTimedOut)
        {
            if (currentTimeOutCanvas) currentTimeOutCanvas.SetActive(true); // Show the timeout canvas only if the timeout has occurred
        }

        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    // Call this function when the "Yes" button is clicked
    public void ExitGame()
    {
        
        // This will close the application in a build
        Application.Quit();

        // This line is for exiting play mode in the Unity editor
        #if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
        #endif
    }
}
