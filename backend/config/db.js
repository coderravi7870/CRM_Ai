import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Avoid deprecation noise & make queries fail fast instead of buffering forever
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });

    return conn;

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Retry logic could be added here
    throw error; // Re-throw to let the caller handle it
  }
};