import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { currentPhysicalState } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Function for finding User
   * @param id of user to be returned
   * @returns UserDetails object
   */
  async findOne(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(id)
      .get();
    return { id, ...snapshot.data() };
  }

  /**
   * Function for finding all objects in userDetails collection with "patient" role
   * @returns list of all patients
   */
  async findAllPatients() {
    const snapshot = await this.firebaseService.firestore
      .collection('userDetails')
      .where('roles', 'array-contains', 'patient')
      .get();
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docs;
  }

  /**
   * Function for finding a specific patient by its ID
   * @param id of patient
   * @returns patient object
   */
  async findWheelchairPatientById(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('patients')
      .doc(id)
      .get();
    return { id, ...snapshot.data() };
  }
  
  /**
   * Function for updating wheelchair patient data 
   * @param uid id of user 
   * @param patientData which is the data to be updated
   * @returns updated values
   */
  async updateWheelchairPatientData(id: string, patientData: currentPhysicalState) {
    const snapshot = await this.firebaseService.firestore
      .collection('patients')
      .doc(id)
      .set(patientData);
    return { id, ...patientData};
  }

  /**
   * Function for getting patient workout overview
   * @param uid id of user
   * @returns object containing users full name and lsit of all sessions
   */
  async getPatientOverview(uid: string) {
    const sessions = await this.firebaseService.firestore
      .collection('sessions')
      .where('userId', '==', uid)
      .get();
    const sessionsArr = sessions.docs.map((doc) => doc.createTime.toDate());
    const userInfo = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(uid)
      .get();
    const { firstName, lastName } = userInfo.data().name;

    return { name: firstName + ' ' + lastName, sessionDates: sessionsArr };
  }

  /**
   * Function for deleting user both from userDetails collection and Users in firebase
   * @param id of user to be deleted
   */
  async delete(id: string): Promise<void> {
    await this.firebaseService.firestore
      .collection('userDetails')
      .doc(id)
      .delete();
    await this.firebaseService.firebaseAdmin.auth().deleteUser(id);
  }
}
