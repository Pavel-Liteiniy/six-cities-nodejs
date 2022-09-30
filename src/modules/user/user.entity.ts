import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import isEmail from 'validator/lib/isEmail.js';

import {User, UserLevel} from '../../types/user.type.js';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.password = data.password;
    this.type = data.type;
  }

  @prop({required: true, minlength: 1, maxlength: 15})
  public name: string;

  @prop({
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'incorrect email format',
    }
  })
  public email: string;

  @prop({match: /\S+\.(jpg|png)$/i, default: 'path/to/default-avatar.png'})
  public avatarPath?: string;

  @prop({required: true})
  public type: UserLevel;

  @prop({required: true, minlength: 6, maxlength: 12})
  public password: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
