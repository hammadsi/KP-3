import { FirebaseService } from 'src/firebase/firebase.service';
import { firestore } from 'firebase-admin';
import { UpdateGameSessionDto } from './dto/update-game-session.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GameSession } from './entities/wheelchairPatient.entity'
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
        let gameSession = {id: doc.id, ...doc.data()} as GameSession;
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

  /**
   * Function for adding a new empty game session to a specific wheelchair patient
   * @param id ID of the wheelchair patient
   * @returns The ID of the newly created game session
   */
  async addEmptyGameSessionToPatient(id: string) {
    try {
      const gameSessionsCollection = this.firebaseService.firestore
        .collection('patients')
        .doc(id)
        .collection('gameSessions');

      const newSession = {
        createdAt: firestore.Timestamp.now().seconds,
      };

      const newSessionRef = await gameSessionsCollection.add(newSession);

      return { id: newSessionRef.id };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Function for updating a game session of a specific wheelchair patient
   * @param patientId ID of the wheelchair patient
   * @param id ID of the game session to update
   * @param gameSession Data to update the game session with
   */
  async updateGameSession(patientId: string, id: string, gameSession: UpdateGameSessionDto) {
    console.log(gameSession.startTime);
    console.log("test");
    try {
      // Verify that startTime and endTime are valid Date instances
      if (!(gameSession.startTime instanceof Date)) {
          throw new Error("startTime is not a valid Date object");
      }
      if (!(gameSession.endTime instanceof Date)) {
          throw new Error("endTime is not a valid Date object");
      }
      
      const gameSessionDoc = this.firebaseService.firestore
        .collection('patients')
        .doc(patientId)
        .collection('gameSessions')
        .doc(id);

      // Check if the document exists
      const docSnapshot = await gameSessionDoc.get();
      if (!docSnapshot.exists) {
        throw new NotFoundException(`Game session with ID ${id} not found`);
      }

      // Transform Date objects to Firestore Timestamps
      const transformedSession = {
        ...gameSession,
        startTime: firestore.Timestamp.fromDate(gameSession.startTime),
        endTime: firestore.Timestamp.fromDate(gameSession.endTime),
        laps: gameSession.laps?.map(lap => {
          if (!(lap.timeStamp instanceof Date)) {
              throw new Error("lap.timeStamp is not a valid Date object");
          }
          return {
            ...lap,
            timeStamp: firestore.Timestamp.fromDate(lap.timeStamp),
          };
        }) || [],
        heartRates: gameSession.timeSeriesData.heartRates?.map(hr => {
          if (!(hr.timestamp instanceof Date)) {
              throw new Error("hr.timestamp is not a valid Date object");
          }
          return {
            ...hr,
            timestamp: firestore.Timestamp.fromDate(hr.timestamp),
          };
        }) || [],
        speeds: gameSession.timeSeriesData.speeds?.map(speed => {
          if (!(speed.timestamp instanceof Date)) {
              throw new Error("speed.timestamp is not a valid Date object");
          }
          return {
            ...speed,
            timestamp: firestore.Timestamp.fromDate(speed.timestamp),
          };
        }) || [],
      };

      await gameSessionDoc.update(transformedSession);

      return { id, ...transformedSession };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

