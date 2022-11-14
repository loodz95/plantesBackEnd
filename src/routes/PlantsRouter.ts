import { Router } from "express";
import {PlantsController} from "../controllers/PlantsController"

const plantsRouter = Router();
const plantsController = new PlantsController()

plantsRouter.get('/', (req,res)=> plantsController.getAllPlants(req, res));
plantsRouter.get('/:id', (req,res)=> plantsController.getPlantsById(req, res));
plantsRouter.post('/', (req,res)=> plantsController.createNewPlants(req, res));
plantsRouter.put('/:id', (req,res)=> plantsController.updatePlants(req, res));
plantsRouter.delete('/:id', (req,res)=> plantsController.deletePlants(req, res));

export default plantsRouter;