import {CronJob} from "cron";
import Tag from "../../../tags";
import {inject, injectable} from "inversify";
import {IScheduler} from "./IScheduler";
import {ILogger} from "../../logger/abstractions/ILogger";
import TYPES from "../../../types";
@injectable()
export abstract class AbstractScheduler implements IScheduler{
    private cronJob: CronJob;

    private initiateScheduler() {
        console.log(`Info: initiate scheduler with name: ${this.getSchedulerName()}`);
        this.cronJob = new CronJob(this.getCroneExpression(), this.executeScheduler);
    }

    abstract executeScheduler(): Promise<void>;

    abstract getCroneExpression(): string;

    abstract getSchedulerName(): string;

    async startScheduler(): Promise<string> {
        this.initiateScheduler();

        if (!this.cronJob.running) {
            this.cronJob.start();
            console.log(`Info: scheduler started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        } else {
            console.log(`Info: scheduler already running with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler already running with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        }
    }

    async stopScheduler(): Promise<string> {
        if(this.cronJob == undefined){
            console.log(`Info: nothing to stop, scheduler was never started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Nothing to stop, scheduler was never started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        }

        if (this.cronJob.running) {
            this.cronJob.stop();
            console.log(`Info: scheduler stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        } else {
            console.log(`Info: scheduler already stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler already stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        }
    }

    abstract getSchedulerTag(): Tag;
}