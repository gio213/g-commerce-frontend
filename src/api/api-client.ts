import { categoryType, CreateProductReviewFormData, LoginFormData, OrderData, OrderType, PaginatedProductParams, PaymentIntentData, ProductDetailPageData, ProductReviewsPaginated, ProductsResponse, ProductType, RegisterFormData, UpdateUser, UserType } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
import axios from 'axios';
export const register = async (formData: RegisterFormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Return the response data

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.errors?.[0]?.message || 'An error occurred during registration';
                throw new Error(errorMessage);
            } else {
                throw new Error('An error occurred during registration');
            }
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const signIn = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })


    const body = await response.json()
    if (!response.ok) {
        throw new Error(body.message)
    }
    return body
}


export const updateUser = async (userId: string, userData: UpdateUser) => {
    const response = await fetch(`${API_BASE_URL}/api/users/update/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    if (!response.ok) {
        throw new Error('An error occurred updating user')
    }
    return response.json()
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error("Invalid token")
    }
    return response.json()
}





export const me = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }


    })
    if (!response.ok) {
        throw new Error('An error occurred getting user data')
    }
    return response.json()
}


export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST'
    })
    if (!response.ok) {
        throw new Error('An error occurred during logout')
    }
}

export const getAllCategories = async (): Promise<categoryType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/category/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('An error occurred fetching categories')
    }
    return response.json()
}

export const createCategory = async (category: { categoryName: string }): Promise<categoryType> => {
    const response = await fetch(`${API_BASE_URL}/api/category/create-category`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
    if (!response.ok) {
        throw new Error('An error occurred creating category')
    }
    return response.json()
}


export const getAllProducts = async (): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/product/all`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('An error occurred fetching products');
    }

    const data = await response.json();
    return data;
};

export const getPaginatedProducts = async ({ page = 1, limit = 8 }: PaginatedProductParams): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/product/products-paginated?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('An error occurred fetching products');
    }



    const data = await response.json();
    return data;
};


export const getProductById = async (productId: string): Promise<ProductDetailPageData> => {
    const response = await fetch(`${API_BASE_URL}/api/product/detail/${productId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    if (!response.ok) {
        throw new Error('An error occurred fetching product')
    }
    return response.json()
}
export const getPaginatedReviews = async ({ page = 1, limit = 4 }: PaginatedProductParams, productId: string): Promise<ProductReviewsPaginated> => {
    const response = await fetch(`${API_BASE_URL}/api/product/reviews-paginated/${productId}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('An error occurred fetching products');
    }



    const data = await response.json();
    return data;
};



export const updateProduct = async (productId: string, productData: ProductType) => {
    const response = await fetch(`${API_BASE_URL}/api/product/update/${productId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',  // Ensure the server knows to parse JSON
        },
        credentials: "include",
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const errorText = await response.text();  // Retrieve error message from the response
        console.error('Error updating product:', errorText);  // Log the server error for debugging
        throw new Error(`An error occurred updating product: ${errorText}`);
    }

    return response.json();
}


export const deleteProduct = async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/product/delete/${productId}`, {
        method: "DELETE",
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error('An error occurred deleting product')
    }
    return response.json()
}


export const createProduct = async (productFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/product/create`, {
        method: "POST",
        credentials: "include",
        body: productFormData
    })
    if (!response.ok) {
        throw new Error('An error occurred creating product')
    }
    return response.json()
}


export const addToCart = async ({ productId, userId }: { productId: string, userId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, userId })
    });

    if (!response.ok) {
        throw new Error('An error occurred adding to wishlist');
    }

    return response.json();
};

export const addToWishlist = async ({ productId, userId }: { productId: string, userId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/wishlist/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, userId })
    });

    if (!response.ok) {
        throw new Error('An error occurred adding to wishlist');
    }

    return response.json();
};




export const getCartItems = async (): Promise<ProductType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/cart/cart-items`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

    });
    if (!response.ok) {
        throw new Error('An error occurred getting cart');
    }
    return response.json();
}

export const getWishlistItems = async (): Promise<ProductType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/wishlist/wishlist-items`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            // If the status is 404, return an empty array
            return [];
        }
        throw new Error('An error occurred getting wishlist');
    }

    return response.json();
}


export const deleteCartItem = async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/cart/remove/cart-item`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    });
    if (!response.ok) {
        throw new Error('An error occurred deleting cart item');
    }
    return response.json();
}

export const deleteWishList = async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/wishlist/remove/wishlist-item`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId }),

    });

    if (!response.ok) {
        throw new Error('An error occurred deleting cart item')
    }
    return response.json()
}

export const clearCart = async () => {
    const response = await fetch(`${API_BASE_URL}/api/cart/clear-cart`, {
        method: 'DELETE',
        credentials: 'include',

    });
    if (!response.ok) {
        throw new Error('An error occurred clearing cart')
    }
    return response.json()
}

export const clearWishlist = async () => {
    const response = await fetch(`${API_BASE_URL}/api/wishlist/clear-wishlist`, {
        method: 'DELETE',
        credentials: 'include',

    });
    if (!response.ok) {
        throw new Error('An error occurred clearing wishlist')
    }
    return response.json()
}

export const createReview = async ({ comment, productId, starRating }: CreateProductReviewFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/product/create-review/${productId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ starRating, comment })
    });

    if (!response.ok) {
        throw new Error('An error occurred creating review');
    }

    return response.json();
};

export const deleteReview = async (reviewId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/product/review/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reviewId })
    });
    if (!response.ok) {
        throw new Error('An error occurred deleting review')
    }
    return response.json()
}

export const createPaymentIntent = async (): Promise<PaymentIntentData> => {

    const response = await fetch(`${API_BASE_URL}/api/checkout/payment-intent`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('An error occurred creating payment intent')
    }

    return response.json()
}

export const checkout = async (order: OrderType) => {
    const response = await fetch(`${API_BASE_URL}/api/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('An error occurred during checkout')
    }
    return response.json(
    )
}


export const getOrders = async (): Promise<OrderData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('An error occurred fetching orders')
    }
    return response.json()

}

export const getAllOrders = async (): Promise<OrderData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/all/orders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('An error occurred fetching orders')
    }
    return response.json()
}

export const getProductsByCategory = async (categoryId: string): Promise<ProductType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/category/search/${categoryId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('An error occurred fetching products');
    }
    return response.json();

}

export const searchProducts = async (searchText: string): Promise<ProductType[]> => {
    const queryParams = new URLSearchParams();
    if (searchText) {
        queryParams.set('searchText', searchText);
    }
    const response = await fetch(`${API_BASE_URL}/api/product/search?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('An error occurred fetching products')
    }

    return response.json()
}