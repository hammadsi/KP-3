import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Timestamp } from '@firebase/firestore-types';
import { NewGameSessionDto } from './dto/new-game-session.dto';
import { UpdatePhysicalStateDto } from './dto/update-physicalstate.dto';

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
      return { id, ...snapshot.data() };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  
  /**
   * Function for updating wheelchair patient data
   * @param uid id of user
   * @param data which is the data to be updated
   * @returns updated values
   */
  async updateWheelchairPatientData(id: string, data: UpdatePhysicalStateDto) {
    await this.firebaseService.firestore
      .collection('patients')
      .doc(id)
      .update({
        currentPhysicalState: data,
      });
    return { id, ...data };
  }

  /**
   * Function for adding a new game session to a specific wheelchair patient
   * @param id ID of the wheelchair patient
   * @param gameSession Data for the new game session
   * @returns The ID and data of the newly created game session
   */
  async addGameSessionToPatient(id: string, gameSession: NewGameSessionDto) {
    try {
      const gameSessionsCollection = this.firebaseService.firestore
        .collection('patients')
        .doc(id)
        .collection('gameSessions');
  
      // Transform Date objects to Firestore Timestamps
      const transformedSession = {
        ...gameSession,
        startTime: Timestamp.fromDate(gameSession.startTime),
        endTime: Timestamp.fromDate(gameSession.endTime),
        laps: gameSession.laps?.map(lap => ({
          ...lap,
          timeStamp: Timestamp.fromDate(lap.timeStamp),
        })) || [],
        heartRates: gameSession.heartRates?.map(hr => ({
          ...hr,
          timestamp: Timestamp.fromDate(hr.timestamp),
        })) || [],
        speeds: gameSession.speeds?.map(speed => ({
          ...speed,
          timestamp: Timestamp.fromDate(speed.timestamp),
        })) || [],
        createdAt: Timestamp.now(),
      };
  
      const newSessionRef = await gameSessionsCollection.add(transformedSession);
      const newSessionSnapshot = await newSessionRef.get();
  
      return { id: newSessionRef.id, ...newSessionSnapshot.data() };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }  
}

