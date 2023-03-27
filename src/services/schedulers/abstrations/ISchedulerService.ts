import {TagDto} from "../dtos/TagDto";
import {SchedulerResultDto} from "../dtos/SchedulerResultDto";

export interface ISchedulerService {
    startSchedulers(): Promise<SchedulerResultDto>
    stopSchedulers(): Promise<SchedulerResultDto>
    startSpecificScheduler(tagDto: TagDto): Promise<SchedulerResultDto>
    stopSpecificScheduler(tagDto: TagDto): Promise<SchedulerResultDto>
}