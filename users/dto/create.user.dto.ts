export interface CreateUserDto {
    id:string;
    email:string;
    password:string;
    firstname?: string;
    permissionFlags?:number;
}