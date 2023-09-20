using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Checkpoint : MonoBehaviour
{
    private CheckpointManager checkpointManagerScript;
    private int myIndex;
    // Start is called before the first frame update
    void Start()
    {
        myIndex = int.Parse(gameObject.name.Split('(', ')')[1]);
        checkpointManagerScript = gameObject.GetComponentInParent<CheckpointManager>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void notifyCollision()
    {
        checkpointManagerScript.checkpointReached(myIndex);
    }
}
