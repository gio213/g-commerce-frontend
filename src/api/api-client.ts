import { LoginFormData, RegisterFormData, UserType } from "@/types";
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

