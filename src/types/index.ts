export type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export type LoginFormData = {
    email: string;
    password: string;
}


export type UserType = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;




}