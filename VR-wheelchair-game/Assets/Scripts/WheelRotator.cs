using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WheelRotator : MonoBehaviour
{

    public float speed;

    //public Rigidbody casterLeftRB;
    //public Rigidbody casterRightRB;
    private CharacterController controller;
    public Transform wheelLeftMesh;
    public Transform wheelRightMesh;
    
    //public Transform forkLeftMesh;
    //public Transform forkRightMesh;

    public Transform casterLeftMesh;
    public Transform casterRightMesh;
    // Start is called before the first frame update
    void Start()
    {
        controller = GetComponentInParent<CharacterController>();
    }

    // Update is called once per frame
    void Update()
    {
        //speed = controller.velocity.magnitude;
        speed = controller.velocity.magnitude;
        Vector3 forward = transform.forward;
        Vector3 moveDir = controller.velocity;
        //Debug.Log("Velocity: " + controller.velocity);
        int dir = 1;
        if (Vector3.Dot(moveDir, forward) < 0.0f)
        {
            dir = -1;
        }
        wheelLeftMesh.Rotate(Vector3.right, dir*speed);
        wheelRightMesh.Rotate(Vector3.right, dir*speed);

    }
}
