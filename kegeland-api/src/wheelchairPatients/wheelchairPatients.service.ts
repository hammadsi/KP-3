import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GameSession } from './entities/wheelchairPatient.entity'
import { FirebaseService } from 'src/firebase/firebase.service';
import { UpdatePhysicalStateDto } from './dto/update-physicalstate.dto';

@Injectable()
export class WheelchairPatientsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Convert Firebase's seconds and nanoseconds timestamp format into a standard JavaScript Date
   * @param firebaseTimestamp - the timestamp from Firebase
   * @returns - JavaScript Date object
   */
  private convertToJsDate(firebaseTimestamp): Date {
    if (firebaseTimestamp && 'seconds' in firebaseTimestamp) {
        return new Date(firebaseTimestamp.seconds * 1000);
    } else {
        // Return null or a default date if firebaseTimestamp is not defined properly
        return null;
    }
}

  /**
   * Transform all Firebase timestamps in a game session into JavaScript Date objects
   * @param session - a game session with potential Firebase timestamps
   * @returns - game session with JavaScript Date timestamps
   */
  private transformGameSessionTimestamps(session: GameSession): GameSession {
    session.startTime = this.convertToJsDate(session.startTime);
    session.endTime = this.convertToJsDate(session.endTime);
    if (session.laps) {
      session.laps.forEach(lap => {
        lap.timeStamp = this.convertToJsDate(lap.timeStamp);
      });
    }
    if (session.heartRates) {
      session.heartRates.forEach(hr => {
        hr.timestamp = this.convertToJsDate(hr.timestamp);
      });
    }
    if (session.speeds) {
      session.speeds.forEach(speed => {
        speed.timestamp = this.convertToJsDate(speed.timestamp);
      });
    }
    return session;
  }

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
        let gameSession = {sessionId: doc.id, ...doc.data()} as GameSession;
        gameSessions.push(this.transformGameSessionTimestamps(gameSession));
      });

      return { id, ...snapshot.data(), gameSessions };
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
}

