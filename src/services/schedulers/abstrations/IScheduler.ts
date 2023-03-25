import {SchedulerResult} from "../results/SchedulerResult";

export interface IScheduler{
    executeScheduler(): Promise<SchedulerResult>
}