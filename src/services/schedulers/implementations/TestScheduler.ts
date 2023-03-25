import {AbstractScheduler} from "../abstrations/AbstractScheduler";
import {SchedulerResult} from "../results/SchedulerResult";
import {injectable} from "inversify";
@injectable()
export class TestScheduler extends AbstractScheduler{
    constructor() {
        super("*/15 * * * * *","TestScheduler");
    }
    public override async executeScheduler(): Promise<SchedulerResult> {
        let result : SchedulerResult = new SchedulerResult();
        try {
            const currentDate = new Date();
            console.log(`Build and send the weekly report - ${currentDate.getHours()}:${currentDate.getMinutes()}`);
            result.success = true;
            return result;
        } catch (e) {
            result.error = e as Error;
            return result;
        }
    }
}