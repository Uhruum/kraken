import {ISchedulerService} from "../abstrations/ISchedulerService";
import {IScheduler} from "../abstrations/IScheduler";
import {inject, injectable, named} from "inversify";
import TYPES from "../../../types";
import Tag from "../../../tags";
import {Body, Post, Route, Tags} from "tsoa";
import container from "../../../inversify.config";
import {TagDto} from "../dtos/TagDto";
import {SchedulerResultDto} from "../dtos/SchedulerResultDto";
import process from "process";
import {ILogger} from "../../logger/abstractions/ILogger";
@Tags('Scheduler Service')
@Route("/api/scheduler")
@injectable()
export class SchedulerService implements ISchedulerService {

    constructor(@inject(TYPES.IScheduler) @named(Tag.TEST_SCHEDULER) private readonly _test: IScheduler,
                @inject(TYPES.IScheduler) @named(Tag.EARTH_QUAKE_SCHEDULER) private readonly _quake: IScheduler,
                @inject(TYPES.ILogger) private readonly _logger: ILogger) {

        if (process.env.RunTestSchedulerAtStart === "true") {
            this._test.startScheduler();
        }

        if (process.env.RunEarthquakeSchedulerAtStart === "true") {
            this._quake.startScheduler();
        }

    }

    @Post("/startSchedulers")
    async startSchedulers(): Promise<SchedulerResultDto> {
        let resultDto= new SchedulerResultDto();
        try {
            await this._test.startScheduler();
            await this._quake.startScheduler();
            resultDto.message = "Schedulers started successfully!";
        }catch (e) {
            resultDto.isErrorThrown=true;
            resultDto.error = e as Error;
        }
        return resultDto;
    }
    @Post("/startSpecificScheduler")
    async startSpecificScheduler(@Body() tagDto: TagDto): Promise<SchedulerResultDto> {
        let resultDto= new SchedulerResultDto();
        try {
            const resolvedScheduler = container.getNamed<IScheduler>(TYPES.IScheduler, tagDto.tag);
            resultDto.message = await resolvedScheduler.startScheduler();
        }catch (e) {
            resultDto.isErrorThrown=true;
            resultDto.error = e as Error;
        }
       return resultDto;
    }
    @Post("/stopSchedulers")
    async stopSchedulers(): Promise<SchedulerResultDto> {
        let resultDto= new SchedulerResultDto();
        try {
            await this._test.stopScheduler();
            await this._quake.stopScheduler();
            resultDto.message = "Schedulers stopped successfully!";
        }catch (e) {
            resultDto.error = e as Error;
            resultDto.isErrorThrown=true;
        }
        return resultDto;
    }
    @Post("/stopSpecificScheduler")
    async stopSpecificScheduler(@Body() tagDto: TagDto): Promise<SchedulerResultDto> {
        let resultDto= new SchedulerResultDto();
        try {
            const resolvedScheduler = container.getNamed<IScheduler>(TYPES.IScheduler, tagDto.tag);
            resultDto.message = await resolvedScheduler.stopScheduler();
        }catch (e) {
            resultDto.error = e as Error;
            resultDto.isErrorThrown=true;
        }
        return resultDto;
    }

}