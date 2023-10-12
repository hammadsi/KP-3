import { Provider } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UpdateSessionDto } from 'src/sessions/dto/update-session.dto';

import { dbMock as firebaseDbMock } from './dbMock';

export const adminMock = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  auth: jest.fn((x) => ({
    deleteUser: jest.fn((x) => x),
  })),
};

export class FirebaseMock {
  db = {
    patients: [new FirebaseDocMock('_id', firebaseDbMock.patients[0])],
    userDetails: [new FirebaseDocMock('_id', firebaseDbMock.userDetails[0])],
    sessions: [new FirebaseDocMock('_id', firebaseDbMock.sessions[0])],
    sensors: [new FirebaseDocMock('_id', firebaseDbMock.sensors[0])],
    questionnaires: [
      new FirebaseDocMock('_id', firebaseDbMock.questionnaires[0]),
    ],
    questions: [new FirebaseDocMock('_id', firebaseDbMock.questions[0])],
    answers: [new FirebaseDocMock('_id', firebaseDbMock.answers[0])],
  };
  res: any = {};

  collection(name: string) {
    this.res = this.db[name];
    this.docs = this.res;
    this.res.forEach((data: any) => this.handleSubCollections(name, data));
    return this;
  }
  
  handleSubCollections(name: string, data: any) {
    if (name === 'patients' && data.gameSessions) {
      data.getCollection = (subName: string) => {
        if (subName === 'gameSessions') {
          return {
            where: (field: string, condition: string, value: string) => this.where(field, condition, value),
            get: () => ({ docs: data.gameSessions }),
          };
        }
      };
    }
  }

  collectionGroup(name: string) {
    this.res = Object.values(this.db)
      .flat()
      .filter((doc: any) => doc.entries && doc.entries[name])
      .map((doc: any) => doc.entries[name]);
    this.docs = this.res.flat();
    return this;
  }

  doc(id: string) {
    this.res = this.res || []; //Ensuring this.res is always defined (even as an empty array) before attempting to call methods on it.
    this.res = this.res.find((e) => e.id === id);
    return this;
  }

  where(field: string, condition: string, value: string) {
    this.res = this.res.filter((e) => {
      switch (condition) {
        case '==':
          return e.entries[field] === value;
        case 'array-contains':
          return e.entries[field].includes(value);
      }
    });
    this.docs = this.res;
    return this;
  }

  get() {
    if (this.res instanceof Object) {
      this.id = this.res.id;
    }
    return this;
  }

  data() {
    if (this.res instanceof Object) {
      return this.res.data();
    }
    if (this.res instanceof Array) {
      return this.res;
    } else {
      console.log('ERRROR');
      return this.res;
    }
  }
  delete() {
    return this.res;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orderBy(field: string, order: string) {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(data: Record<string, unknown>) {
    this.id = '_id2';
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set(data: UpdateSessionDto, obj: Record<string, unknown>) {
    return this;
  }

  docs = this.res;
  id = this.res.id;
}

class FirebaseDocMock {
  id: string;
  createTime = {
    toDate: () => {
      return new Date(null);
    },
  };
  entries: Record<string, unknown>;
  constructor(id: string, dat: Record<string, unknown>) {
    this.id = id;
    this.entries = dat;
  }

  data() {
    return this.entries;
  }
}

export const FirebaseProviderMock: Provider<FirebaseService> = {
  provide: FirebaseService,
  useFactory: (): any => ({
    firestore: new FirebaseMock(),
    firebaseAdmin: { ...adminMock },
  }),
};
