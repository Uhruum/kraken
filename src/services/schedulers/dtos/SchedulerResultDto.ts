/**
 * Represents result of scheduler service action
 */
export class SchedulerResultDto{
    message:string
    error: Error
    isErrorThrown: boolean = false;
}