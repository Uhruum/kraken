import {TagDto} from "../dtos/TagDto";
import {SchedulerResultDto} from "../dtos/SchedulerResultDto";

/**
 * Manges lifecycle of cron schedulers
 */
export interface ISchedulerService {
    /**
     * Starts all registered schedulers
     * @returns {@link SchedulerResultDto}
     */
    startSchedulers(): Promise<SchedulerResultDto>
    /**
     * Stops all registered schedulers
     * @returns {@link SchedulerResultDto}
     */
    stopSchedulers(): Promise<SchedulerResultDto>

    /**
     * Starts registered scheduler specified by {@link TagDto}
     * @param tagDto
     * @returns {@link SchedulerResultDto}
     */
    startSpecificScheduler(tagDto: TagDto): Promise<SchedulerResultDto>
    /**
     * Stops registered scheduler specified by {@link TagDto}
     * @param tagDto
     * @returns {@link SchedulerResultDto}
     */
    stopSpecificScheduler(tagDto: TagDto): Promise<SchedulerResultDto>
}