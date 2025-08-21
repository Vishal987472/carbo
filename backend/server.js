    import express from "express";
    import dotenv from "dotenv";
    import cors from "cors";
    import helmet from "helmet";
    import cookieParser from "cookie-parser";
    import morgan from "morgan";
    import connectDB from "./config/db.js";
    import authRoutes from "./routes/authRoutes.js";
    import calculatorRoutes from "./routes/calculatorRoutes.js";
    import shopRoutes from "./routes/shopRoutes.js";
    import chatRoutes from "./routes/chatRoutes.js";
    import carpoolRoutes from "./routes/carpoolRoutes.js";
    import ecoRoutes from "./routes/ecocenter.js";


    dotenv.config();
    connectDB();

    const app = express();

    // Middleware
    app.use(express.json());
    app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
    );
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(cookieParser());

    // Routes
    app.use("/auth", authRoutes);
    app.use("/calculator", calculatorRoutes);
    app.use("/shop", shopRoutes);
    app.use("/chat", chatRoutes);
    app.use("/carpool", carpoolRoutes);
    app.use("/ecocenter", ecoRoutes);

    app.get("/", (req, res) => {
    res.send("API is running");
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
