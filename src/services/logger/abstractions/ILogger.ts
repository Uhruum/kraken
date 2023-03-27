export interface ILogger {
    log(logLevel: "DEBUG" | "INFO" | "ERROR", message:string): void
}