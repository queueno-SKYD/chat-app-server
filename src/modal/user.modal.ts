export default interface UserModel{
    firstName: string;
    lastName?: string;
    email: string;
    imageURL?: string;
    createdBy?: number;
    deleted?: boolean;
    deleteBy?: number;
    createdAt?: Date;
    userId: number;
    password: string;
    userType: number;
  }