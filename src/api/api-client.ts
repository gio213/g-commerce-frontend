import { categoryType, LoginFormData, ProductsResponse, ProductType, RegisterFormData, UpdateUser, UserType } from "@/types";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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
        credentials: 'include',
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


export const getProductById = async (productId: string): Promise<ProductsResponse> => {
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