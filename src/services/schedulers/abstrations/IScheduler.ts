/**
 * Cron scheduler
 */
export interface IScheduler{
     /**
      * Contains business logic of specific scheduler
      */
     executeScheduler(): Promise<void>

     /**
      * Initiate and starts cron scheduler
      */
     startScheduler(): Promise<string>

     /**
      * Stops cron scheduler
      */
     stopScheduler(): Promise<string>
}