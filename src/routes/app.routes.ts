import { Router } from "express";
import {
  AuthRoutes,
  AuthorRoutes,
  BookRoutes,
  CategoryRoutes,
  EventRoutes,
  FineRoutes,
  LoanRoutes,
  OrderRoutes,
  ReservationRoutes,
  ReviewRoutes,
  RoleRoutes,
  SupplierRoutes,
  TransactionRoutes,
  UserRoutes,
} from "./";
import { verifyToken } from "../middlewares/verifyToken";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);
    router.use("/authors", verifyToken, AuthorRoutes.routes);
    router.use("/books", verifyToken, BookRoutes.routes);
    router.use("/categories", verifyToken, CategoryRoutes.routes);
    router.use("/events", verifyToken, EventRoutes.routes);
    router.use("/fines", verifyToken, FineRoutes.routes);
    router.use("/loans", verifyToken, LoanRoutes.routes);
    router.use("/orders", verifyToken, OrderRoutes.routes);
    router.use("/reservations", verifyToken, ReservationRoutes.routes);
    router.use("/reviews", verifyToken, ReviewRoutes.routes);
    router.use("/roles", verifyToken, RoleRoutes.routes);
    router.use("/suppliers", verifyToken, SupplierRoutes.routes);
    router.use("/transactions", verifyToken, TransactionRoutes.routes);
    router.use("/users", verifyToken, UserRoutes.routes);

    return router;
  }
}
