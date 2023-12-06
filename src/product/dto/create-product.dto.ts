import { Date } from "mongoose"

export class CreateProductDto {
    titile : String
    gender : String
    description : String
    image : []
    price: Number
    category: String
    weight : Number
}
