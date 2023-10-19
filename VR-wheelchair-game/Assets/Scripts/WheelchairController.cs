using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR;
using UnityEngine.InputSystem;
  


public class WheelchairController : MonoBehaviour
{
    //private XRController controller = null;
    
    [SerializeField] WheelCollider frontleft;
    [SerializeField] WheelCollider frontright;
    [SerializeField] WheelCollider backleft;
    [SerializeField] WheelCollider backright;

    [SerializeField] Transform frontleftTR;
    [SerializeField] Transform frontrightTR;
    [SerializeField] Transform backleftTR;
    [SerializeField] Transform backrightTR;

    public float Acceleration = 500f;
    public float BreakingForce = 300f;
    public float MaxTurnAngle = 15;

    public float CurrentAcceleration = 0;
    public float CurrentBreakForce = 0;
    public float CurrentTurnAngle = 0;

    private Vector2 joystick;
    private bool controller = false;

    private float leftWheelSpeed;
    private float rightWheelSpeed;
    private float deadZoneRadius = 0.1f;  // Adjustments probably needed

    float wheelchairWidth = 0.5f;  // Adjust based on actual wheelchair width
    float maxWheelSpeed = 10f;    // Maximum wheel speed, adjustments probably needed




   void Start()
    {
        if (ErgometerInputDevice.current != null)
        {
        controller = true;
        joystick = ErgometerInputDevice.current.leftStick.ReadValue();
        }
    }
    public void Update()
    {
        if (gameObject.transform.localRotation.eulerAngles.z > 90f && gameObject.transform.localRotation.eulerAngles.z < 180f)
        {

            //winlosescript.loselevel();
        }

       
    }

   private void FixedUpdate()
    {
        if (controller)
            {
                WheelSpeedLoop();
            }
        CurrentAcceleration = Acceleration * Input.GetAxis("Vertical");
        

        if (Input.GetKey(KeyCode.Space))
            
            CurrentBreakForce = BreakingForce;
            else
                CurrentBreakForce = 0;

        frontright.motorTorque = CurrentAcceleration;
        frontleft.motorTorque = CurrentAcceleration;

        backright.brakeTorque = CurrentBreakForce;
        backleft.brakeTorque = CurrentBreakForce;

        CurrentTurnAngle = MaxTurnAngle * Input.GetAxis("Horizontal");
        frontleft.steerAngle = CurrentTurnAngle;
        frontright.steerAngle = CurrentTurnAngle;

        UpdateWheel(frontright, frontrightTR);
        UpdateWheel(backleft, backleftTR);
        UpdateWheel(frontleft, frontleftTR);
        UpdateWheel(backright, backrightTR);
    }

    void UpdateWheel(WheelCollider col, Transform trans)
    {
        Vector3 position;
        Quaternion rotation;
        col.GetWorldPose(out position, out rotation);

        trans.position = position;
        trans.rotation = rotation;
    }

    private float RestoreJoystickValue(Vector2 joystickInput, float deadZoneRadius)
{
    float r = joystickInput.magnitude;

    if (r <= deadZoneRadius)
    {
        return 0f;
    }
    else
    {
        return (r - deadZoneRadius) / (1 - deadZoneRadius);
    }
}

    private void WheelSpeedLoop()
    {
    Vector2 rawJoystick = ErgometerInputDevice.current.leftStick.ReadValue();
    float restoredMagnitude = RestoreJoystickValue(rawJoystick, deadZoneRadius);
    Vector2 restoredJoystick = rawJoystick.normalized * restoredMagnitude;


    leftWheelSpeed = maxWheelSpeed * (restoredJoystick.y + (wheelchairWidth / 2) * restoredJoystick.x);
    rightWheelSpeed = maxWheelSpeed * (restoredJoystick.y - (wheelchairWidth / 2) * restoredJoystick.x);
    }


}
