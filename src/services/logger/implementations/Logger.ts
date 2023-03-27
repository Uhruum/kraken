import {ILogger} from "../abstractions/ILogger";
import {injectable} from "inversify";

@injectable()
export class Logger implements ILogger{
    public log(level: "DEBUG" | "INFO" | "ERROR", message: string): void {
        const time = new Date().toISOString();
        console.log(`${time} - ${level} - ${message}`);
    }
}