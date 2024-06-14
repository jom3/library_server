import { Router } from "express";
import { ReviewModel } from "../models/review.model";
import { ReviewService } from "../services/review.service";
import { ReviewController } from "../controllers/review.controller";
import { roleAuthorization } from "../middlewares/roleAuthorization";

export class ReviewRoutes {
  static get routes(): Router {
    const router = Router();
    const reviewModel = new ReviewModel();
    const reviewService = new ReviewService(reviewModel);
    const controller = new ReviewController(reviewService);

    router.get("/", roleAuthorization(['admin', 'employee','customer']), controller.getReviews);
    router.get('/:id', roleAuthorization(['admin', 'employee','customer']), controller.getReviewById)
    router.post('/', roleAuthorization(['admin', 'employee','customer']), controller.postReview)
    router.patch('/:id', roleAuthorization(['admin', 'employee']), controller.patchReview)

    return router;
  }
}
