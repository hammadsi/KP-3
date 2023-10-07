import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';
import { timestamp } from '../utils/timestamp';

@Injectable()
export class WheelchairPatientsService {
  constructor(private readonly firebaseService: FirebaseService) {}

   /**
   * Function for finding a specific patient by its ID
   * @param id of patient
   * @returns patient id
   */
   async findWheelchairPatientById(id: string) {
    try {
      const snapshot = await this.firebaseService.firestore
        .collection('patients')
        .doc(id)
        .get();
        
      if (!snapshot.exists) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      return { id, ...snapshot.data()};
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  
}
