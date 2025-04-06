"use client"

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPostById = (id: string) => {
    return useQuery({
        queryKey: ["useFetchPostById", id],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/?id=${id}`);

            if (!response) {
                throw new Error("Failed to fetch post");
            }
            return response.data.post;
        },
    });
};


export const useFetchPost = () => {
    return useQuery({
        queryKey: ["useFetchPost", "all"],
        queryFn: async () => {
            const response = await axios.get(`/api/posts`);

            if (!response || !response.data) {
                throw new Error("Failed to fetch post");
            }

            return response.data.post || [];
        },
    });
};

export const useFetchPostByUserId = (userId: any) => {
    return useQuery({
        queryKey: ["useFetchPost", userId],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/?userId=${userId}`);

            if (!response) {
                throw new Error("Failed to fetch post");
            }

            return response.data.post;
        },
    });
};

