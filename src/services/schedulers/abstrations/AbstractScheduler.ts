import {CronJob} from "cron";
import {injectable} from "inversify";
import {IScheduler} from "./IScheduler";
import TYPES from "../../../compositionRoot/types";
import {ILogger} from "../../logger/abstractions/ILogger";
import container from "../../../compositionRoot/inversify.config";

@injectable()
export abstract class AbstractScheduler implements IScheduler {
    private _cronJob: CronJob;
    private _logger: ILogger;

    abstract executeScheduler(): Promise<void>;

    abstract getCroneExpression(): string;

    abstract getSchedulerName(): string;

    async startScheduler(): Promise<string> {
        this._logger = container.get<ILogger>(TYPES.ILogger);
        this._logger.log("INFO", `Initiate scheduler with name: ${this.getSchedulerName()}`);
        if (this._cronJob == undefined)
            this._cronJob = new CronJob(this.getCroneExpression(), this.executeScheduler);

        if (!this._cronJob.running) {
            this._cronJob.start();
            this._logger.log("INFO", `Scheduler started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        } else {
            this._logger.log("INFO", `Scheduler already running with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler already running with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        }
    }

    async stopScheduler(): Promise<string> {
        this._logger = container.get<ILogger>(TYPES.ILogger);

        if (this._cronJob == undefined) {
            this._logger.log("INFO", `Nothing to stop, scheduler was never started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Nothing to stop, scheduler was never started with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        }

        if (this._cronJob.running) {
            this._cronJob.stop();
            this._logger.log("INFO", `Scheduler stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        } else {
            this._logger.log("INFO", `Scheduler already stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`);
            return `Scheduler already stopped with cron expression: ${this.getCroneExpression()} and name: ${this.getSchedulerName()}`;
        }
    }
}