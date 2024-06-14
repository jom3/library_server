import { ReviewModel } from '../models/review.model'
import { Review } from '../shared/schemas/review.schema'

export class ReviewService{

  constructor(
    private readonly reviewModel:ReviewModel
  ){}

  async getReviews():Promise<Review[]>{
    return await this.reviewModel.getReviews()
  }
  
  async getReviewById(id:number):Promise<Review>{
    return await this.reviewModel.getReviewById(id)
  }
  
  async postReview(review:Review):Promise<Review>{
    return await this.reviewModel.postReview(review)
  }
  
  async patchReview(review:Review, id:number):Promise<Review>{
    return await this.reviewModel.patchReview(review,id)
  }
}
