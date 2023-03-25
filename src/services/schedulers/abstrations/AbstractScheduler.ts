import {SchedulerResult} from "../results/SchedulerResult";
import * as cron from 'node-cron';
import {IScheduler} from "./IScheduler";
export abstract class AbstractScheduler implements IScheduler{
    private readonly _scheduleTime: string;
    private readonly _name: string;
    private task: cron.ScheduledTask;

    private options: cron.ScheduleOptions = {
        scheduled: true,
        recoverMissedExecutions: true
    }

    protected constructor(scheduleTime:string, name:string) {
        this._scheduleTime = scheduleTime;
        this._name = name;
        this.initiateScheduler();
    }

    private initiateScheduler() {
        console.log(`Info: initiate scheduler with name: ${this._name }`);
        this.options.name = this._name;
        this.task = cron.schedule(this._scheduleTime, this.taskInitializer, this.options);
        this.task.start();
        console.log(`Info: scheduler started with cron expression: ${this._scheduleTime } and with name: ${this._name }`);
    }

    private async taskInitializer() : Promise<void>{
        const jobResult: SchedulerResult = await this.executeScheduler();
        if (jobResult.success) {
            console.log("Scheduler Successfully executed!");
        } else {
            jobResult.error = new Error("Error to execute the scheduled job");
            console.log(`Error: ${jobResult.error.message }`);
        }
    }

    public abstract executeScheduler(): Promise<SchedulerResult>;
}