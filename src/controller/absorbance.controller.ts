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
  try {
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
      compound: body.compound,
      filename: result.filename,
      dayOfStudy: body.dayOfStudy,
      temperature: body.temperature,
      concentration: result.concentration,
      maxIntensity: result.maxIntensity,
      maxWavelenght: result.maxWavelenght,
    });

    
    //aqui tambien habria que cargar en la coleccion de conditions en caso de estar vacia agregar uno para el userId
    // en caso de tener ya cargado temperatura o concentracion o dia de estudio o compuesto verificar si es el mismo que se esta cargando
    //si es el mismo no hacer nada, si es diferente hacer un push 

    /* {
      userId: string;
      temperatures: string[];
      concentrations: string[];
      daysOfStudies: string[];
      compounds: string[]
    } */

    //hay que crear un servicio y usarlo aqui algo como, upsertCondition (insert or update)
    // hay que crear un modelo y un schema para las conditions y usarlo desde el service upsertCondition

    //hay que crear tambien un controller con un metodo getConditionsByUserId que buscara en la tabla conditions por el userId y respondera con
    //el objeto de arreglos de las condiciones que usara el usuario


    return res.send({ absorbance });
  } catch (error: any) {
    logger.error(error.message);
    logger.error(error)
    return res.status(400).send('A error happen while uploading the files');
  }
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
