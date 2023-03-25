
export interface IScheduler{
     executeScheduler(): Promise<void>
     startScheduler(): Promise<void>
     stopScheduler(): Promise<void>
}