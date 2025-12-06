import * as fs from "fs";



export default class JsonManager<T> {

  constructor(private readonly filePath: string) { }

  readonly write = async (newItem: T): Promise<boolean> => {
    try {
      let dataArray: T[] = [];

      if (fs.existsSync(this.filePath)) {

        const fileContent = fs.readFileSync(this.filePath, "utf-8").trim();
        if (fileContent) {
          dataArray = JSON.parse(fileContent);

          if (!Array.isArray(dataArray)) {
            return false;
          }
        }
      }


      dataArray.push(newItem);

      const json = JSON.stringify(dataArray, null, 2);
      fs.writeFileSync(this.filePath, json, "utf-8");

      return true
    } catch (error) {
      console.log("f")
      return false;
    }
  }

  readonly read = async (): Promise<T[]> => {
    try {
      if (!fs.existsSync(this.filePath)) return [];
      const fileContent = fs.readFileSync(this.filePath, "utf-8").trim();
      if (!fileContent) return [];
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return [];
    }
  }


  readonly overwrite = async (newData: T[]): Promise<boolean> => {
    try {
      await fs.writeFileSync(
        this.filePath,
        JSON.stringify(newData, null, 2),
        'utf-8'
      );
      return true;
    } catch (error) {
      console.log('Error overwriting JSON file: ', error);
      return false;
    }
  }


  readonly update = async (id: number, partial: Partial<T>): Promise<boolean> => {
    try {
      const data = await this.read(); // data es T[]
      const index = data.findIndex((item: any) => item.id === id);

      if (index === -1) {
        return false; // No se encontró el elemento
      }

      // Actualiza solo los campos enviados
      data[index] = { ...data[index], ...partial } as T;

      await fs.writeFileSync(
        this.filePath,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      return true;
    } catch (error) {
      console.log('Error updating JSON file: ', error);
      return false;
    }
  }

  readonly replace = async (id: number, newObject: T): Promise<boolean> => {
    try {
      const data = await this.read(); // data es T[]
      const index = data.findIndex((item: any) => item.id === id);

      if (index === -1) {
        return false; // No encontrado
      }

      // Aseguramos que el nuevo objeto mantenga el mismo ID
      (newObject as any).id = id;

      // Reemplazo completo
      data[index] = newObject;

      await fs.writeFileSync(
        this.filePath,
        JSON.stringify(data, null, 2),
        'utf-8'
      );

      return true;
    } catch (error) {
      console.log('Error replacing JSON object: ', error);
      return false;
    }
  }


  readonly delete = async (id: number): Promise<boolean> => {
    try {
      const data = await this.read()
      const filteredData = data.filter((item: any) => item.id !== id)

      if (filteredData.length === data.length) {
        return false
      }

      await fs.writeFileSync(
        this.filePath,
        JSON.stringify(filteredData, null, 2),
        'utf-8'
      )
      return true
    } catch (error) {
      console.log('Error deleting from JSON file: ', error)
      return false
    }
  }


}

