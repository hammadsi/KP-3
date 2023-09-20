using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VrUIUtils : MonoBehaviour
{

    public bool isVR;
    [Header("VR UI objects")]
    public GameObject VRTimerCanvas;
    public GameObject VRTimeOutCanvas;

    [Header("Monitor UI objects")]
    public GameObject MonitorTimerCanvas;
    public GameObject MonitorTimeOutCanvas;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public GameObject getTimerCanvas()
    {
        if (isVR)
        {
            return VRTimerCanvas;
        } else
        {
            return MonitorTimerCanvas;
        }
    }

    public GameObject getTimeOutCanvas()
    {
        if (isVR)
        {
            return VRTimeOutCanvas;
        } else
        {
            return MonitorTimeOutCanvas;
        }
    }
}
