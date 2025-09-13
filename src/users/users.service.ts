import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as sgMail from '@sendgrid/mail';
import { log } from 'node:console';
import * as crypto from 'crypto';


@Injectable()
export class UsersService {
 

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      // console.warn('SENDGRID_API_KEY is not set');
    }
    if (apiKey) {
      sgMail.setApiKey(apiKey);
    }
  }

  // async findByGoogleId(googleId: string): Promise<User | null> {
  //   return this.usersRepository.findOne({ where: { googleId } });
  // }

  
 

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, personalWhatsappNumber, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        statusCode: 400,
        message: 'Email already exists',
      };
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({
      fullName,
      email,
      personalWhatsappNumber,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const payload = { sub: savedUser.id, email: savedUser.email };
    const token = this.jwtService.sign(payload);
console.log('Payload::::::::', payload);

    return {
      success: true,
      statusCode: 201,
      message: 'User created successfully',
      data: {
        id: savedUser.id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        personalWhatsappNumber: savedUser.personalWhatsappNumber,
        // token,
      },
    };
  }


  
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { success: true, message: `User #${id} removed` };
  }
}
