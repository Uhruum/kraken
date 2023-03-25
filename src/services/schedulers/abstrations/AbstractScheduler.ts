import {SchedulerResult} from "../results/SchedulerResult";
import * as cron from 'node-cron';
import {IScheduler} from "./IScheduler";
export abstract class AbstractScheduler implements IScheduler{
    private readonly _scheduleTime: string;
    private readonly _name: string;
    private task: any;

    private options: cron.ScheduleOptions = {
        scheduled: true
    }

    protected constructor(timeToExecute: string, name: string) {
        this._scheduleTime = timeToExecute;
        this._name= name;
        this.initiateScheduler();
    }

    private initiateScheduler() {
        const isJobValidated = cron.validate(this._scheduleTime);
        if (isJobValidated) {
            this.options.name = this._name;
            this.task = cron.schedule(this._scheduleTime, this.taskInitializer, this.options);
        }
        this.task.start();
    }

    async taskInitializer() : Promise<void>{
        const job: SchedulerResult = await this.executeScheduler();
        if (job.success) {
            console.log("Job Successfully executed");
        } else {
            job.error = new Error("Error to execute the scheduled job");
        }
    }

    abstract executeScheduler(): Promise<SchedulerResult>;

}