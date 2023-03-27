import {ISchedulerService} from "../abstrations/ISchedulerService";
import {IScheduler} from "../abstrations/IScheduler";
import {inject, injectable, named} from "inversify";
import TYPES from "../../../types";
import Tag from "../../../tags";
import {Body, Post, Route, Tags} from "tsoa";
import container from "../../../inversify.config";
import {TagDto} from "../dtos/TagDto";
import {SchedulerResultDto} from "../dtos/SchedulerResultDto";
@Tags('Scheduler Service')
@Route("/api/scheduler")
@injectable()
export class SchedulerService implements ISchedulerService {

    private readonly _testScheduler: IScheduler;
    private readonly _earthQuakeApiScheduler : IScheduler;
    constructor(@inject(TYPES.IScheduler) @named(Tag.TEST_SCHEDULER) test: IScheduler,
                @inject(TYPES.IScheduler) @named(Tag.EARTH_QUAKE_SCHEDULER) quake: IScheduler) {
        this._testScheduler = test;
        this._earthQuakeApiScheduler = quake;
    }

    @Post("/startSchedulers")
    async startSchedulers(): Promise<SchedulerResultDto> {
        let resultDto= new SchedulerResultDto();
        try {
            await this._testScheduler.startScheduler();
            await this._earthQuakeApiScheduler.startScheduler();
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
            await this._testScheduler.stopScheduler();
            await this._earthQuakeApiScheduler.stopScheduler();
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