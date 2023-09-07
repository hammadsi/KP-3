import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { map } from 'lodash';

import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Function for finding sensor in database
   * @param id of sensor
   * @returns sensor object
   */
  async findOne(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('sensors')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  /**
   * Function for finding all sensors in database
   * @returns list of all sensors
   */
  async findAll() {
    const snapshots = await this.firebaseService.firestore
      .collection('sensors')
      .get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  /**
   * Function for creating new sensor
   * @param data data for new sensor
   * @returns the created Sensor object
   */
  async create(data: CreateSensorDto) {
    await this.firebaseService.firestore
      .collection('sensors')
      .doc(data.name)
      .set(data);
    return { id: data.name, ...data };
  }

  /**
   * Function for updating existing sensor
   * @param id of sensor
   * @param data fields and data to be updated
   * @returns updated Sensor object
   */
  async update(id: string, data: UpdateSensorDto) {
    await this.firebaseService.firestore
      .collection('sensors')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  /**
   * Function for deleting sensor in database
   * @param id of sensor to be deleted
   * @returns Promise<void>
   */
  async delete(id: string) {
    await this.firebaseService.firestore.collection('sensors').doc(id).delete();
  }
}
