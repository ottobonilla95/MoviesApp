import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  mongoose.Promise = Promise;
  const mongoUri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  await mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on("error", async (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      await mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
});
