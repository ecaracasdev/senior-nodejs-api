import { Request, Response } from "express";
import {
  CreateAbsorbanceInput,
  UpdateAbsorbanceInput,
  UpdateMaxIntensitiesInput,
} from "../schema/absorbance.schema";
import logger from "../utils/logger";
import {
  createAbsorbance,
  findAbsorbances,
  findAvgAbsorbances,
  updateMaxIntensities,
} from "../service/absorbance.service";
import { extractConcentration } from "../utils/strings.utils";

//@ts-ignore
const getMaxIntensities = (absorbances) => {
  const filename = absorbances["name"];
  const concentration = extractConcentration(absorbances["name"]);
  const parsedAbsorbance = absorbances["content"];
  const wLIntensity = parsedAbsorbance.replace(/"/g, "").split("\r\n");
  const startIndex = wLIntensity.findIndex(
    //@ts-ignore
    (element) => element === "Wavelength nm.,Intensity"
  );

  // crea un nuevo array que contiene solo los valores de longitud de onda e intensidad
  //@ts-ignore
  const data = wLIntensity.slice(startIndex + 1).map((element) => {
    const [wavelength, x, intensity, y] = element.split(",");
    return {
      wavelength: parseFloat(wavelength),
      //@ts-ignore
      intensity: parseFloat(Number(intensity) + Number(y) / 1000),
    };
  });

  let maxIntensity = 0;
  let maxWavelenght = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].intensity > maxIntensity) {
      maxIntensity = data[i].intensity;
      maxWavelenght = data[i].wavelength;
    }
  }

  return { concentration, maxIntensity, maxWavelenght, filename };
};

export async function uploadAbsorbancesFilesHandler(
  req: Request<{}, {}, CreateAbsorbanceInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const existingAbsorbances = await findAbsorbances({
    dayOfStudy: body.dayOfStudy,
    temperature: body.temperature,
    //@ts-ignore
    filename: body.absorbances["name"],
  });

  if (existingAbsorbances.length > 0) {
    return res.status(400).send({
      message: "Absorbances already exist for this study and temperature",
    });
  }

  const result = getMaxIntensities(body.absorbances);
  const absorbance = await createAbsorbance({
    userId,
    filename: result.filename,
    dayOfStudy: body.dayOfStudy,
    temperature: body.temperature,
    concentration: result.concentration,
    maxIntensity: result.maxIntensity,
    maxWavelenght: result.maxWavelenght,
  });

  return res.send({ absorbance });
}

export async function getAvgAbsorbancesHandler(
  req: Request<UpdateAbsorbanceInput["params"]>,
  res: Response
) {
  const data = await findAvgAbsorbances();
  res.send(data);
}

export async function updateMaxIntensitiesHandler(
  req: Request<{}, {}, UpdateMaxIntensitiesInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const absorbanceUpdated = await updateMaxIntensities({ body });
  if (!absorbanceUpdated) throw new Error("error al remover la max intensity");
  const newAvgAbsorbances = await findAvgAbsorbances();

  return res.send(newAvgAbsorbances);
}
