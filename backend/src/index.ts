import "dotenv/config";
import cors from "cors";
import './config/passport.config';
import session from "cookie-session";
import { config } from "./config/app.config";
import { HTTPSTATUS } from "./config/http.config";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import { connectDatabase } from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import passport from "passport";
import authRoutes from "./routes/auth.route";


const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "session",
        keys: [config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true,
    })
)

app.get(`/`, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a bad request!", ErrorCodeEnum.AUTH_INVALID_TOKEN);
    res.status(HTTPSTATUS.OK).json({ message: "Hello World!" });
}));


app.use(`${BASE_PATH}/auth`, authRoutes);


app.use(errorHandler);





app.listen(config.PORT, async () => {
    console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`);
    await connectDatabase();
});

