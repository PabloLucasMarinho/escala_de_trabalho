import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../../../domain/entities/User.js";

describe("User Model", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("Deve aplicar setters de name e e-mail e usar o valor default para 'active'", async () => {
    const user = await User.create({
      name: "pablo",
      email: "TESTE@EMAIL.COM",
      password: "0BkM6}b5",
    });

    expect(user.name).toBe("PABLO");
    expect(user.email).toBe("teste@email.com");
    expect(user.active).toBe(true);
  });

  it("Deve falhar se não informar campos obrigatórios", async () => {
    const user = new User({});
    try {
      await user.validate();
    } catch (error: any) {
      expect(error.errors.name).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    }
  });
});
