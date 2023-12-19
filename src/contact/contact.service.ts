import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { contactModel } from 'src/schema/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private contactModel: Model<contactModel>,
  ) {}
  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactModel.create(createContactDto);
    return contact
  }

  findAll() {
    return `This action returns all contact`;
  }


}
