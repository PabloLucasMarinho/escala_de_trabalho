import mongoose from "mongoose";

async function main() {
  if (process.env.NODE_ENV !== "test" && !process.env.JEST_WORKER_ID) {
    try {
      await mongoose.connect("mongodb://localhost:27017/escaladetrabalho");
      console.log("Conectou ao Mongoose!");
    } catch (error) {
      throw new Error(`Erro ao conectar ao Mongoose: ${error}`);
    }
  }
}

main().catch((err) => console.log(err));

export default mongoose;
