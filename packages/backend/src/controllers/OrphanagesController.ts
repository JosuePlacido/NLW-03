import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { uuid } from 'uuidv4';
import * as Yup from "yup";

import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(orphanageView.render(orphanage));
  },
  async create(request: Request, response: Response) {
    const {
	  name,
	  whatsapp,
      latitude,
      longitude,
      about,
      opening_hours,
      instructions,
      open_on_weekends,
    } = request.body;

    const orphanageRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { id: uuid(), path: image.filename };
    });

    const data = {
      id: uuid(),
	  name,
	  whatsapp: whatsapp.replace(/\D/g, ""),
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
    	name: Yup.string().required(),
    	whatsapp: Yup.string().required().length(11),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      instructions: Yup.string().required(),
      about: Yup.string().max(300).required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
