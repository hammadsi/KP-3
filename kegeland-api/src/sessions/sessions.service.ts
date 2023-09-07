import { Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

import { timestamp } from '../utils/timestamp';

import { CreateSessionDto } from './dto/create-session.dto';
import { ListSessionsDto, SessionListItem } from './dto/list-sessions.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Function for finding Session object by its ID
   * @param id of session to be found
   * @returns Session object
   */
  async findOne(id: string): Promise<Session> {
    const snapshot = await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .get();
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Session;
  }

  /**
   * Function for finding all sessions based on query parameters
   * @param filters query parameters: name of sensor and/or userId
   * @returns list of all Sessions according to query parameters
   */
  async findAll(filters: ListSessionsDto): Promise<SessionListItem[]> {
    let query: any = this.firebaseService.firestore.collection('sessions');
    if ('sensor' in filters) {
      query = query.where('sensor', '==', filters.sensor);
    }
    if ('userId' in filters) {
      query = query.where('userId', '==', filters.userId);
    }
    const snapshots = await query.orderBy('createdAt', 'desc').get();
    return map(snapshots.docs, (doc) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, ...spread } = doc.data();
      return {
        id: doc.id,
        ...spread,
      };
    });
  }

  /**
   * Function for creating new session in database
   * @param data fields and data for new sessions entry
   * @returns created Sessions object
   */
  async create(data: CreateSessionDto): Promise<Session> {
    const ts = timestamp();
    const docRef = await this.firebaseService.firestore
      .collection('sessions')
      .add({ ...data, createdAt: ts });
    return { id: docRef.id, ...data, createdAt: ts };
  }

  /**
   * Function for updating existing sessions object
   * @param id of Sessions to be updated
   * @param data fields and data to be changed
   * @returns updated Sessions object
   */
  async update(id: string, data: UpdateSessionDto): Promise<Partial<Session>> {
    await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .set(data, { merge: true });
    return { id, ...data };
  }

  /**
   * Function for deleting Sessions object
   * @param id of object to be deleted
   */
  async delete(id: string): Promise<void> {
    await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .delete();
  }
}
