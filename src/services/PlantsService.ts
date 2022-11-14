import { Plants } from "../interfaces/PlantsInterface";
import { AppDataSource } from "./data-source";

export class PlantsService {
  getAllPlants(): Promise<Plants[]> {
    return AppDataSource.query(`SELECT * FROM plant;`);
  }

  getPlantsById(id: number): Promise<Plants[]> {
    return AppDataSource.query(`SELECT name FROM plant WHERE id =${id}`);
  }

  createNewPlants(newPlant: Plants): Promise<Plants[]> {
    return AppDataSource.query(`INSERT INTO plant (name, unitprice_ati, quantity, category)
    VALUES ('${newPlant.name}', ${newPlant.unitprice_ati}, ${newPlant.quantity}, '${newPlant.category}')`);
  }

  updatePlants(id: number, updatedPlant: Plants): Promise<Plants[]> {
    return AppDataSource.query(`UPDATE plant
SET name = '${updatedPlant.name}', unitprice_ati = ${updatedPlant.unitprice_ati}, quantity = ${updatedPlant.quantity}, category = '${updatedPlant.category}'
WHERE id = ${id}`);
  }

  deletePlants(id: number): Promise<any> {
    return AppDataSource.query(`DELETE from plant
    WHERE id = ${id}`);
  }
}
