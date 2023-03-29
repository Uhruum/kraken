/**
 * manages logging
 */
export interface ILogger {
    /**
     * Logs message as time - level - message
     * @param logLevel "DEBUG" | "INFO" | "ERROR"
     * @param message custom message for log
     */
    log(logLevel: "DEBUG" | "INFO" | "ERROR", message:string): void
}