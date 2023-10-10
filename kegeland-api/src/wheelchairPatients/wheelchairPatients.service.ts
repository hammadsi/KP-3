import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GameSession } from './entities/wheelchairPatient.entity'
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class WheelchairPatientsService {
  constructor(private readonly firebaseService: FirebaseService) {}

   /**
   * Function for finding a specific patient by its ID
   * @param id of patient
   * @returns patient data along with their gameSessions
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

      // Fetching gameSessions sub-collection
      const gameSessions: GameSession[] = [];
      const sessionsSnapshot = await this.firebaseService.firestore
        .collection('patients')
        .doc(id)
        .collection('gameSessions')
        .get();

      sessionsSnapshot.forEach(doc => {
        gameSessions.push({sessionId: doc.id, ...doc.data()} as GameSession);
      });

      return { id, ...snapshot.data(), gameSessions};
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
