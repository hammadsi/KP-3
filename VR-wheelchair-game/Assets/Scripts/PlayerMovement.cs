using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerMovement : MonoBehaviour
{
    public float maxVelocity = 1f;
    public float maxTurn = 1f;
    //public Transform playerPosition;

    public float moveVal = 0f;
    public float turnVal = 0f;

    public float TotalMovement { get { return totalMovement; } private set { totalMovement = value; } }
    [SerializeField]
    private float totalMovement = 0.0f;

    public float TotalTurnedDegrees { get { return totalTurnedDegrees; } private set { totalTurnedDegrees = value; } }
    [SerializeField]
    private float totalTurnedDegrees = 0.0f;

    private CharacterController controller;

    private float verticalVelocity;
    private float gravityValue = 9.81f;

    private IEnumerator inputDisabler;
    //private Vector3 playerVelocity;

    // Start is called before the first frame update
    void Start()
    {
        controller = gameObject.GetComponent<CharacterController>();
        //inputDisabler = StartCoroutine(InputDisabler);
        // TODO!!!!
    }

    //IEnumerator InputDisabler()
    //{
    //    moveVal = 0.0f;
    //    turnVal = 0.0f;
    //}

    private void OnMove(InputValue value)
    {

        moveVal = value.Get<float>();
    }

    private void OnTurn(InputValue value)
    {

        turnVal = value.Get<float>();
    }


    private void OnControllerColliderHit(ControllerColliderHit hit)
    {
        try
        {
            if (hit.gameObject.name.Substring(0, 10).ToLower() == "checkpoint")
            {
                hit.gameObject.GetComponent<Checkpoint>().notifyCollision();
            }
        }
        catch
        {
            return;
        }
        //string gameObjectName = hit.gameObject.name;
        //if (gameObjectName.Length => checkpointName.Length)
        //{
        //    if (hit.gameObject.name == "Checkpoint")
        //    {
        //        Debug.Log("Checkpoint hit");
        //    }
        //}

        //Debug.Log("Collider hit");
    }

    // Update is called once per frame
    void Update()
    {

        bool groundedPlayer = controller.isGrounded;

        if (groundedPlayer && verticalVelocity < 0)
        {
            verticalVelocity = 0f;
        }

        verticalVelocity -= gravityValue * Time.deltaTime;

        Vector3 move = new Vector3(0, verticalVelocity, moveVal);
        move = transform.localRotation * move * maxVelocity * Time.deltaTime;

        float turn = maxTurn * turnVal * Time.deltaTime;
        totalMovement += Mathf.Abs(move.x) + Mathf.Abs(move.z); /* We don't want to record vertical movement */
        totalTurnedDegrees += Mathf.Abs(turn);


        //Vector3 move += move.TransformDirection(Vector3.fwd)
        controller.Move(move);
        transform.Rotate(transform.up, turn);
        //controller.transform.Rotate(controller.transform.up, turnVal);
        //transform.Translate(new Vector3(0, 0, moveVal) * maxVelocity * Time.deltaTime);

    }
}
