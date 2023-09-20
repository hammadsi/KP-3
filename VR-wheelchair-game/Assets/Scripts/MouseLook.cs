using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class MouseLook : MonoBehaviour
{
    public InputActionReference horizontalLook;
    public InputActionReference verticalLook;
    public float lookSpeed = 1f;
    public Transform cameraTransform;
    float pitch;
    float yaw;

    // Start is called before the first frame update
    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        horizontalLook.action.performed += HandleHorizontalLookChange;
        verticalLook.action.performed += HandleVerticalLookChange;
    }


    void HandleHorizontalLookChange(InputAction.CallbackContext obj)
    {
        yaw += obj.ReadValue<float>();
        //transform.localRotation = Quaternion.AngleAxis(yaw * lookSpeed, Vector3.up);
        transform.localRotation = Quaternion.Euler(pitch * lookSpeed, yaw * lookSpeed,  0);
    }

    void HandleVerticalLookChange(InputAction.CallbackContext obj)
    {
        pitch -= obj.ReadValue<float>();
        //transform.localRotation = Quaternion.AngleAxis(pitch * lookSpeed, Vector3.right);
        transform.localRotation = Quaternion.Euler(pitch * lookSpeed, yaw * lookSpeed, 0);
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
