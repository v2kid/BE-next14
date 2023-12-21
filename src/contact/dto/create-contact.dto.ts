import { IsEmail, IsNotEmpty,isDate } from 'class-validator';
export class CreateContactDto {
    name : String
    email : String
    message : String
    status : String
}
