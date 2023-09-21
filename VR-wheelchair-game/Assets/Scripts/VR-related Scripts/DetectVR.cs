using UnityEngine;
using UnityEngine.XR.Management;

public class DetectVR : MonoBehaviour
{
    public GameObject timerAndLogistics;
    public GameObject xrOrigin;
    public GameObject xrInteractionManager;
    public GameObject desktopCharacter;
    public GameObject desktopInputManager;

    private VrUIUtils vrUiUtilScript;
    private void enableVr(bool on)
    {
        vrUiUtilScript.isVR = on;
        xrOrigin.SetActive(on);
        xrInteractionManager.SetActive(on);

        desktopCharacter.SetActive(!on);
        desktopInputManager.SetActive(!on);
    }

    void Awake()
    {
        vrUiUtilScript = timerAndLogistics.GetComponent<VrUIUtils>();
        var xrSettings = XRGeneralSettings.Instance;
        if (xrSettings == null)
        {
            Debug.Log("XRGeneralSettings are null");
            return;
        }

        var xrManager = xrSettings.Manager;
        if (xrManager == null)
        {
            Debug.Log("XRManager is null");
            return;
        }

        var xrLoader = xrManager.activeLoader;
        if (xrLoader == null)
        {
            Debug.Log("XRLoader is null. No VR Headset connected");
            enableVr(false);
            return;
        }

        Debug.Log("VR Headset connected");
        enableVr(true);

    }
}
