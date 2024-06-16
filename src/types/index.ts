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
export type categoryType = {
    _id: string;
    categoryName: string;

}
export type CreateProductFormData = {

    name: string;
    description: string;
    price: number;
    countInStock: number;
    imageFiles: FileList[];
    imagesUrls: string[];
    category: string;
    lastUpdated: Date;
}


export type ProductType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imagesUrls: string[];
    category: string;
    lastUpdated: Date;
    userId: string;
}