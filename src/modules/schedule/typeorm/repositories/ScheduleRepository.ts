import { AppDataSource } from '../../../../shared/typeorm/data-source';
import { Schedule } from '../entities/Schedule';

export const ScheduleRepository = AppDataSource.getRepository(Schedule);
