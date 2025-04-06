"use client"

import { useQuery } from "@tanstack/react-query";

export const useFetchPostById = (id: string) => {
    return useQuery({
        queryKey: ["useFetchPostById", id],
        queryFn: async () => {
            const response = await fetch(`/api/posts/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch post");
            }
            return response.json();
        },
    });
};


export const useFetchPost = () => {
    return useQuery({
        queryKey: ["useFetchPost"],
        queryFn: async () => {
            const response = await fetch(`/api/posts`);
            if (!response.ok) {
                throw new Error("Failed to fetch post");
            }

            return response.json();
        },
    });
};
