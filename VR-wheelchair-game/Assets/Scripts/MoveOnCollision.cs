using UnityEngine;

public class MoveOnCollision : MonoBehaviour
{
    public float forceMultiplier = 1.0f; // You can change this in the Unity editor to apply more or less force
    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();

    }

    void OnCollisionEnter(Collision collision)
{


    if (collision.gameObject.CompareTag("Player"))
    {
        // Use the first contact point to get the collision direction
        Vector3 collisionDirection = collision.contacts[0].normal;

        // Apply force in the direction opposite of the collision
        Vector3 force = -collisionDirection * forceMultiplier;

        rb.AddForce(force, ForceMode.Impulse);
    }
}
    
}
