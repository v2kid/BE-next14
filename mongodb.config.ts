import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: 'mongodb+srv://vgiakhang:DXB3EhGSOB7jtgq6@cluster0.emvpffz.mongodb.net/test',
}));