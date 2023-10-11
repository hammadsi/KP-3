using System;
using System.Collections.Generic;

namespace DummyIMUDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Dictionary<string, double>> imuDataList = GenerateDummyIMUData(10);

            // Print the generated data for verification
            int index = 0;
            foreach (var imuData in imuDataList)
            {
                Console.WriteLine($"Data set {++index}:");
                foreach (var entry in imuData)
                {
                    Console.WriteLine($"{entry.Key}: {entry.Value}");
                }
                Console.WriteLine();
            }
        }

        public static List<Dictionary<string, double>> GenerateDummyIMUData(int numberOfDataSets)
        {
            List<Dictionary<string, double>> imuDataList = new List<Dictionary<string, double>>();
            Random rand = new Random();
            double timeStamp = 0;

            for (int i = 0; i < numberOfDataSets; i++)
            {
                Dictionary<string, double> imuData = new Dictionary<string, double>
                {
                    { "timeStamp", timeStamp },
                    { "x_accel", rand.NextDouble() },
                    { "x_gyro", rand.NextDouble() * 100 },
                    { "y_accel", rand.NextDouble() },
                    { "y_gyro", rand.NextDouble() * -10 },
                    { "z_accel", rand.NextDouble() },
                    { "z_gyro", rand.NextDouble() * 80 }
                };

                imuDataList.Add(imuData);
                timeStamp += 0.00390625; // Increment timestamp
            }

            return imuDataList;
        }
    }
}
