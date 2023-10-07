import { Injectable } from '@nestjs/common';
// import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

// import { timestamp } from '../utils/timestamp';

@Injectable()
export class WheelchairPatientsService {
  constructor(private readonly firebaseService: FirebaseService) {}

   /**
   * Function for finding a specific patient by its ID
   * @param id of patient
   * @returns patient id
   */
   async findWheelchairPatientById(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('patients')
      .doc(id)
      .get();
    console.log({ id, ...snapshot.data() });

    //Part of a test: if return value does not fit in WheelchairPatient interface
    //return { id, ...snapshot.data() };
    return { id, ...snapshot.data()};
  }
}
