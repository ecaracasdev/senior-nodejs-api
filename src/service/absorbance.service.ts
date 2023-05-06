import { FilterQuery, QueryOptions } from "mongoose";
import AbsorbanceModel, {
  AbsorbanceDocument,
  AbsorbanceInput,
} from "../models/absorbance.model";
import { UpdateMaxIntensitiesInput } from "../schema/absorbance.schema";

export async function createAbsorbance(input: AbsorbanceInput) {
  return AbsorbanceModel.create(input);
}

export async function findAbsorbances(
  query?: FilterQuery<AbsorbanceDocument> | undefined,
  options: QueryOptions = { lean: true }
) {
  return AbsorbanceModel.find(query || {}, {}, options);
}

export async function findAvgAbsorbances() {
  const data = await AbsorbanceModel.aggregate([
    {
      $group: {
        _id: {
          temperature: "$temperature",
          concentration: "$concentration",
          dayOfStudy: "$dayOfStudy",
        },
        maxIntensities: { $push: "$maxIntensity" },
        avgIntensity: { $avg: "$maxIntensity" },
      },
    },
  ]);

  const sortedArray = data.sort((a, b) => {
    const concentrationA = parseInt(a._id.concentration);
    const concentrationB = parseInt(b._id.concentration);
    if (concentrationA < concentrationB) {
      return -1;
    }
    if (concentrationA > concentrationB) {
      return 1;
    }
    return 0;
  });

  return sortedArray;
}

export async function updateMaxIntensities(input: UpdateMaxIntensitiesInput) {
  const { _id, maxIntensity } = input.body;
  const { temperature, concentration, dayOfStudy } = _id;
  const deletedAbsorbance = await AbsorbanceModel.findOneAndDelete({
    temperature,
    concentration,
    dayOfStudy,
    maxIntensity,
  });
  if (!deletedAbsorbance) throw new Error("error");
  return deletedAbsorbance;
}
