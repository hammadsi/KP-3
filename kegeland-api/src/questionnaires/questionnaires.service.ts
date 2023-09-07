import { NotFoundException, Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

import { AssignQuestionnaireDto } from './dto/assign-questionnaire.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { FindAnswersDto } from './dto/find-answers.dto';
import { FindQuestionnairesDto } from './dto/find-questionnaires.dto';
import { GetAssignedQuestionnaireDto } from './dto/get-assigned-questionnaire.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Injectable()
export class QuestionnairesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Function for assigning questionnaire to a user for a given sensor
   * @param data
   * @returns data upon successful request
   */
  async assignQuestionnaire(data: AssignQuestionnaireDto) {
    const { userId, sensor, questionnaireId } = data;
    await this.firebaseService.firestore
      .collection('userDetails')
      .doc(userId)
      .collection('questionnaires')
      .doc(sensor)
      .set({
        questionnaireId,
      });
    return data;
  }

  /**
   * Function for finding questionnaires assigned to a user
   * @param userId id of user
   * @param filters as GetAssignedQuestionnaireDto
   * @returns questionnaire according to query parameters
   */
  async getAssignedQuestionnaire(
    userId: string,
    filters: GetAssignedQuestionnaireDto,
  ) {
    const { sensor } = filters;
    const ref = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(userId)
      .collection('questionnaires')
      .doc(sensor)
      .get();

    try {
      const snapshot = await this.firebaseService.firestore
        .collection('questions')
        .doc(ref.data().questionnaireId)
        .get();
      return { id: snapshot.id, ...snapshot.data() };
    } catch (err) {
      throw new NotFoundException();
    }
  }

  /**
   * Function for finding all questionnaires for a given sensor
   * @param filters query filters
   * @returns list all questionnaires accoring to query parameters (filters)
   */
  async findAllQuestionnaires(filters: FindQuestionnairesDto) {
    let query: any = this.firebaseService.firestore.collection('questions');
    if ('sensor' in filters) {
      query = query.where('sensor', '==', filters.sensor);
    }
    const snapshots = await query.get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  /**
   * Function for finding specific questionnaire by its ID
   * @param id
   * @returns specific questionnaire
   */
  async findOneQuestionnaire(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  /**
   * Function for creating new questionnaire
   * @param data fields and data for new questionnaire
   * @returns created questionnaire (incuding its id)
   */
  async createQuestionnaire(data: CreateQuestionnaireDto) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .add(data);

    return { id: doc.id, ...data };
  }

  /**
   * Function for updating questionnaire
   * @param id of questionnaire to be updated
   * @param data fields and data to be updated
   * @returns Questionnaire
   */
  async updateQuestionnaire(id: string, data: UpdateQuestionnaireDto) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  /**
   * Function for deleting questionnaire
   * @param id of questionnaire to be deleted
   */
  async deleteQuestionnaire(id: string) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .delete();
  }

  /**
   * Function for finding all answers in a questionnaire
   * @param qid id of questionnaire
   * @param filters query parameters by user or session
   * @returns list of all answers according to query parameters (filter)
   */
  async findAllAnswers(qid: string, filters: FindAnswersDto) {
    let query: any = this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers');
    if ('userId' in filters) {
      query = query.where('userId', '==', filters.userId);
    }
    if ('sessionId' in filters) {
      query = query.where('sessionId', '==', filters.sessionId);
    }
    const snapshots = await query.get();
    return snapshots.docs.map((doc) => ({
      id: doc.id,
      createdAt: doc.createTime.seconds,
      ...doc.data(),
    }));
  }

  /**
   * Function for getting answer
   * @param qid questionnaire id
   * @param id id of answer
   * @returns specific answer
   */
  async getAnswer(qid: string, id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  /**
   * Function for creating new answer
   * @param qid id of questionnaire where the answer belongs
   * @param data contents of answer
   * @returns created answer (including its id)
   */
  async createAnswer(qid: string, data: CreateAnswerDto) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .add({
        ...data,
      });

    return { id: doc.id, ...data };
  }

  /**
   * Function for updating exising answer
   * @param qid id of questionnaire where answer belong
   * @param id id of answer
   * @param data fields and data to be changed
   * @returns updated answer
   */
  async updateAnswer(qid: string, id: string, data: UpdateAnswerDto) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  /**
   * Function for deleting answer
   * @param qid id of questionnaire
   * @param id id of answer to be deleted
   */
  async deleteAnswer(qid: string, id: string) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .doc(id)
      .delete();
  }
}
