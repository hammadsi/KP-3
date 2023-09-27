using UnityEngine;

public class MoveOnCollision : MonoBehaviour
{
    public float forceMultiplier = 1.0f; // You can change this in the Unity editor to apply more or less force
    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        if (rb == null)
        {
            Debug.LogError("No Rigidbody component found on this GameObject.");
        }
    }

    void OnCollisionEnter(Collision collision)
{
    Debug.Log("Collision Detected with " + collision.gameObject.name);
    Debug.Log("Relative Velocity: " + collision.relativeVelocity);
    Debug.Log("My Velocity: " + rb.velocity);

    if (collision.rigidbody != null)
    {
        Debug.Log("Other Object's Velocity: " + collision.rigidbody.velocity);
    }
    else
    {
        Debug.Log("Other Object's Velocity: N/A (no Rigidbody)");
        // If the object collided with doesn't have a Rigidbody, continue moving based on last velocity.
        rb.velocity = rb.velocity;
        return;
    }

    if (collision.gameObject.CompareTag("Player"))
    {
        // Use the first contact point to get the collision direction
        Vector3 collisionDirection = collision.contacts[0].normal;

        // Apply force in the direction opposite of the collision
        Vector3 force = -collisionDirection * forceMultiplier;

        Debug.Log("Applying Force: " + force);
        rb.AddForce(force, ForceMode.Impulse);
    }
}
    
}
