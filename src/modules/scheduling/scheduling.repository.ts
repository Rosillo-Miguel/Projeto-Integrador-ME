import { IPaginatedResult } from "../../types/response.types.js";
import { FindAllParams } from "../../types/response.types.js";
import SchedulingModel from "./scheduling.model.js";
import {
  ISchedulingRepository,
  ICreateSchedulingDTO,
  IUpdateSchedulingDTO,
  IScheduling,
} from "./scheduling.types.js";
import PatientModel from "../patient/patient.model.js";
import ExpertModel from "../expert/expert.model.js";
export class SchedulingRepository implements ISchedulingRepository {
  public async create(data: ICreateSchedulingDTO): Promise<IScheduling> {
    const scheduling = await SchedulingModel.create(data);
    return scheduling.toObject();
  }

  public async findAll({
    page = 1,
    limit = 10,
    search,
  }: FindAllParams): Promise<IPaginatedResult<IScheduling>> {
    const filter: any = {};

    if (search) {
      const patients = await PatientModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { cpf: { $regex: search, $options: "i" } },
        ],
      })
        .select("_id")
        .lean();
      const patientIds = patients.map((p) => p._id);

      const experts = await ExpertModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { cpf: { $regex: search, $options: "i" } },
        ],
      })
        .select("_id")
        .lean();
      const expertIds = experts.map((e: any) => e._id);

      filter.$or = [
        { patient: { $in: patientIds } },
        { expert: { $in: expertIds } },
        {
          $expr: {
            $regexMatch: {
              input: {
                $dateToString: {
                  format: "%d/%m/%Y %H:%M",
                  date: "$dateScheduling",
                },
              },
              regex: search,
              options: "i",
            },
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [itens, totalItens] = await Promise.all([
      SchedulingModel.find(filter)
        .populate("patient")
        .populate({
          path: "expert",
          populate: {
            path: "specialty",
          },
        })
        .skip(skip)
        .limit(limit)
        .sort({ dateScheduling: 1 })
        .lean(),

      SchedulingModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItens / limit);

    return {
      itens,
      totalItens,
      totalPages,
      currentPage: page,
    };
  }

  public async findById(id: string): Promise<IScheduling | null> {
    return await SchedulingModel.findById(id).lean();
  }

  public async update(
    id: string,
    data: IUpdateSchedulingDTO,
  ): Promise<IScheduling | null> {
    return await SchedulingModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  public async delete(id: string): Promise<IScheduling | null> {
    return await SchedulingModel.findByIdAndDelete(id).lean();
  }
}
