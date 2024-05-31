import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const ownerRole = await this.roleService.getRole('owner', true);
    if (!ownerRole) {
      throw new InternalServerErrorException('Could not locate owner role');
    }

    const owner = createStoreDto.owner;
    delete createStoreDto.owner;
    const store = await this.storeModel.create(createStoreDto);

    owner.role = ownerRole.id;
    const ownerUser = await this.userService.create(store.id, owner);
    if (!owner) {
      throw new InternalServerErrorException('Could not create owner');
    }

    return {
      store: store,
      owner: ownerUser,
    };
  }

  findAll() {
    return this.storeModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
