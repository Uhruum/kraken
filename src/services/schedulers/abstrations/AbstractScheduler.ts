import {IScheduler} from "./IScheduler";
import {CronJob} from "cron";

export abstract class AbstractScheduler implements IScheduler {
    private readonly _scheduleTime: string;
    private readonly _name: string;
    private task: CronJob;

    protected constructor() {
        this._scheduleTime = this.getCroneExpression();
        this._name = this.getSchedulerName();
        this.initiateScheduler();
    }

    private initiateScheduler() {
        console.log(`Info: initiate scheduler with name: ${this._name}`);
        this.task = new CronJob(this._scheduleTime, this.executeScheduler);
        // Start job
        if (!this.task.running) {
            this.task.start();
            console.log(`Info: scheduler started with cron expression: ${this._scheduleTime} and name: ${this._name}`);

        } else {
            console.log(`Info: scheduler already running with cron expression: ${this._scheduleTime} and name: ${this._name}`);
        }

    }

    abstract executeScheduler(): Promise<void>;

    abstract getCroneExpression(): string;

    abstract getSchedulerName(): string;
}