export interface IScheduler{
     executeScheduler(): Promise<void>
     startScheduler(): Promise<string>
     stopScheduler(): Promise<string>
}