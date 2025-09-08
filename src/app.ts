import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

// import todoRoutes from "./routes/todo.route"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1/todos", todoRoutes);
app.get("/api/v1/health", (_req: Request, res: Response) => {
   res.status(200).json({message: "Server is up and healthy", status: "OK"});
});

// global err handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode)
        .json({message: err.message || "Something went wrong", status: statusCode })
});

export default app;