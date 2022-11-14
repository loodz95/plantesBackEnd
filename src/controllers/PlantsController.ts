import {PlantsService} from "../services/PlantsService"
import { Request, Response } from "express";
import { Plants } from "../interfaces/PlantsInterface";

export class PlantsController {
  public plantsService = new PlantsService();

  async getAllPlants(req: Request, res: Response): Promise<void> {
    try {
      const allPLants = await this.plantsService.getAllPlants();
      res.send({ status: "OK", data: allPLants });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async getPlantsById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      const thePlant = await this.plantsService.getPlantsById(id);
      res.send({status:"OK", data: thePlant});
    } catch (error:any) {
res
  .status(error?.status || 500)
  .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async createNewPlants(req: Request, res: Response): Promise<void> {
   const newPlant: Plants = {
     ...req.body,
   };
   console.log(newPlant);
   if (
     !newPlant.name ||
     newPlant.unitprice_ati === undefined ||
     newPlant.quantity === undefined ||
     newPlant.category === undefined
   ) {
     res.status(400).send({
       status: "FAILED",
       data: {
         error:
           "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity','category'",
       },
     });
     return;
   }

   try {
     await this.plantsService.createNewPlants(newPlant);
     res.status(201).send({
       status: "OK",
       message: `New plant created`,
     });
   } catch (error: any) {
     res
       .status(error?.status || 500)
       .send({ status: "FAILED", data: { error: error?.message || error } });
   }
  }
 
  async updatePlants(req: Request, res: Response): Promise<void> {
    const changes: Plants = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.unitprice_ati || !changes.quantity || !changes.category) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity', 'category'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      const myUpdate = await this.plantsService.updatePlants(id, changes);
      res.status(201).send({
        status: "OK",
        message: `Plant with id ${id} updated`,
        data: myUpdate
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  
  async deletePlants(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);
        await this.plantsService.deletePlants(id);
        res
          .status(200)
          .send({ status: "OK", message: `Plants with id ${id} removed` });
    } catch(error:any) {
 res
   .status(error?.status || 500)
   .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}   ;
