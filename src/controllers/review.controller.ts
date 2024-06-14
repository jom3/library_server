import { Request, Response } from "express";
import httpResponse from "../shared/responses/http.response";
import safeParse from '../shared/helpers/safeParse.helper'
import { ReviewService } from "../services/review.service";
import { ReviewSchema } from "../shared/schemas/review.schema";

export class ReviewController {
  constructor(private readonly reviewSvc: ReviewService) {}

  getReviews = async (req: Request, res: Response) => {
    try {
      const reviews = await this.reviewSvc.getReviews();
      return httpResponse.Ok(res, reviews);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when getting all the reviews`,
      });
    }
  };

  getReviewById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const review = await this.reviewSvc.getReviewById(+id);
      if (!review) {
        return httpResponse.NotFound(
          res,
          `There's not a review with id: ${id}`
        );
      }
      return httpResponse.Ok(res, review);
    } catch (error: any) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when obtaining the review with id:${id}`,
      });
    }
  };

  postReview = async (req: Request, res: Response) => {
    try {
      const result = safeParse.parse(res, ReviewSchema,req.body)
      if(!result){
        return;
      }
      await this.reviewSvc.postReview(result.data);
      return httpResponse.Created(res, `New review was added`);
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when creating a review`,
      });
    }
  };

  patchReview = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (isNaN(+id)) {
        return httpResponse.InternalServerError(
          res,
          `The current id:${id} is not a number`
        );
      }
      const result = safeParse.parse(res, ReviewSchema,req.body)
      if(!result){
        return;
      }
      await this.reviewSvc.patchReview(result.data, +id)
      return httpResponse.Ok(res, `The review with id: ${id} was updated`)
    } catch (error) {
      return httpResponse.InternalServerError(res, {
        error,
        message: `Error when updating the review`,
      });
    }
  };
}
