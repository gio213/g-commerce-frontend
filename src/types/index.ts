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
export type CreateProductReviewFormData = {
    userId?: string;
    productId: string;
    starRating: number;
    comment: string;



}

export type ProductReviewType = {
    _id?: string;
    userId?: string;
    productId?: string;
    starRating?: number;
    comment?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    createdAt?: string;
}

export type UserType = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export type UpdateUser = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    newPassword: string;
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



export type PaginatedProductParams = {
    page?: number;
    limit?: number;
}

export type WishListAndCartItems = {
    category: string;
    countInStock: number;
    description: string;
    createdAt: string;
    imagesUrls: string[];
    lastUpdated: string;
    name: string;
    price: number;
    updatedAt: string;
    userId: string;
    _id: string;


}

export type ProductType = {
    count: number;
    totalPrice: number;
    _id: string;
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imagesUrls: string[];
    category: string;
    lastUpdated: Date;
    userId: string;
    docId: string;
}


export type ProductsResponse = {
    products: ProductType[];
    productDetail: ProductType;
    totalPages: number;
    currentPage: number;
    totalProducts: number;
    simmilarProducts: ProductType[];
    reviews: ProductReviewType[];
}

export type ProductDetailPageData = {
    currentRewiesPage: number;
    productDetail: ProductType;
    reviews: ProductReviewType[];
    simmilarProducts: ProductType[];
    totalReviewsPages: number;
    totalRewiews: number;
};

export type ProductReviewsPaginated = {
    currentRewiesPage: number;
    reviews: ProductReviewType[];
    totalReviewsPages: number;
    totalRewiews: number;

};

export type Reviews = {
    _id?: string;
    userId?: string;
    productId?: string;
    starRating?: number;
    comment?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    createdAt?: string;
    reviewId?: string;
}

export type PaymentIntentResponse = {
    paymetnItentId: string;
    clientSecret: string;
    totalCost: number;
}


export type OrderType = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    paymentIntentId: string;
    clientSecret: string;
}


export type PaymentIntentData = {
    clientSecret: string;
    paymentIntentId: string;
    totalCost: number;
}


export type OrderData = {
    _id: string
    userId: string
    products: ProductType[]
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}