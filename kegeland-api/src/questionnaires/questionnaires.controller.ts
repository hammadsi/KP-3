import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { AssignQuestionnaireDto } from './dto/assign-questionnaire.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { FindAnswersDto } from './dto/find-answers.dto';
import { FindQuestionnairesDto } from './dto/find-questionnaires.dto';
import { GetAssignedQuestionnaireDto } from './dto/get-assigned-questionnaire.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnairesService } from './questionnaires.service';

@ApiTags('Questionnaires')
@Controller('questionnaires')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles(Role.PATIENT, Role.PHYSICIAN)
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  /**
   * Endpoint for assigning questionnaire to user
   * @param data fields and data for questionnaire assignment as body of request
   * @returns Promise<AssignQuestionnaireDto>
   */
  @Post('assignments')
  assignQuestionnaire(@Body() data: AssignQuestionnaireDto) {
    return this.questionnairesService.assignQuestionnaire(data);
  }

  /**
   * Endpoint for fetching all assignments per user
   * @param userId
   * @param filters query parameters
   * @returns Promise<{id: string}>
   */
  @Get('assignments/:userId')
  getAssignedQuestionnaire(
    @Param('userId') userId: string,
    @Query() filters: GetAssignedQuestionnaireDto,
  ) {
    return this.questionnairesService.getAssignedQuestionnaire(userId, filters);
  }

  /**
   * Endpoint for fetching all questionnaires
   * @param filters query parameters passed in the URL of the request
   * @returns list of all questionnaires
   */
  @Get()
  findAllQuestionnaires(@Query() filters: FindQuestionnairesDto) {
    return this.questionnairesService.findAllQuestionnaires(filters);
  }

  /**
   * Endpoint for fetching single questionnaire
   * @param id
   * @returns specific questionnaire
   */
  @Get(':id')
  findOneQuestionnaire(@Param('id') id: string) {
    return this.questionnairesService.findOneQuestionnaire(id);
  }

  /**
   * Endpoint for creating new questionnaire
   * @param data questionnaire data passed as body of the request
   * @returns created questionnaire object
   */
  @Post()
  createQuestionnaire(@Body() data: CreateQuestionnaireDto) {
    return this.questionnairesService.createQuestionnaire(data);
  }

  /**
   *
   * @param id
   * @param data as UpdateQuestionnaireDto
   * @returns questionnaire as {name: string, sensor: Sensor, questions: QuestionField[], id: string}
   */
  @Put(':id')
  updateQuestionnaire(
    @Param('id') id: string,
    @Body() data: UpdateQuestionnaireDto,
  ) {
    return this.questionnairesService.updateQuestionnaire(id, data);
  }

  /**
   * Endpoint for deleting questionnaire
   * @param id of questionnaire
   * @returns {Promise<void>}
   */
  @Delete(':id')
  deleteQuestionnaire(@Param('id') id: string) {
    return this.questionnairesService.deleteQuestionnaire(id);
  }

  /**
   * Endpoint for fetching all answers in a questionnaire
   * @param qid questionnaire id
   * @param filters passed as parameters of request URL
   * @returns all answers for questionnaire according to query parameters
   */
  @Get(':questionaireId/answers')
  findAllAnswers(
    @Param('questionaireId') qid: string,
    @Query() filters: FindAnswersDto,
  ) {
    return this.questionnairesService.findAllAnswers(qid, filters);
  }

  /**
   * Endpoint for fertching specific answer in a questionnaire
   * @param qid questionnaireId
   * @param id answerId
   * @returns Answer for questionnaire
   */
  @Get(':questionaireId/answers/:id')
  findOneAnswer(@Param('questionaireId') qid: string, @Param('id') id: string) {
    return this.questionnairesService.getAnswer(qid, id);
  }

  /**
   * Endpoint for creating new answer in a questionnaire
   * @param qid questionnaireId
   * @param data Answer data passed as body in request
   * @returns Answer that has been sucsessfully created
   */
  @Post(':questionaireId/answers')
  createAnswer(
    @Param('questionaireId') qid: string,
    @Body() data: CreateAnswerDto,
  ) {
    return this.questionnairesService.createAnswer(qid, data);
  }

  /**
   * Endpoint for updating existing answer
   * @param qid id of questionnaire
   * @param id id of answer
   * @param data fields and data to be updated, passed as body of request
   * @returns updated Answer
   */
  @Put(':questionaireId/answers/:id')
  updateAnswer(
    @Param('questionaireId') qid: string,
    @Param('id') id: string,
    @Body() data: UpdateAnswerDto,
  ) {
    return this.questionnairesService.updateAnswer(qid, id, data);
  }

  /**
   * Endpoint for deleting answer in questionnaire
   * @param qid id of questionnaire where the answer belongs
   * @param id id answer that is to be deleted
   * @returns Promise<void>
   */
  @Delete(':questionaireId/answers/:id')
  deleteAnswer(@Param('questionaireId') qid: string, @Param('id') id: string) {
    return this.questionnairesService.deleteAnswer(qid, id);
  }
}
