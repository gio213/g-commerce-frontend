import { categoryType, LoginFormData, ProductType, RegisterFormData, UserType } from "@/types";
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

    if (!response) {
        throw new Error(body.message)
    }
    return body
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


export const getAllProducts = async (): Promise<ProductType[]> => {
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