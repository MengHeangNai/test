import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Todo {
    id: number;
    title: string;
    status: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface TodosResponse {
    todos: Todo[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
    };
}

const fetchTodos = async (userId: string, status: string, page: number = 1) => {
    try {
        const response = await axios.get<TodosResponse>(
            `/api/todos?userId=${userId}&status=${status}&page=${page}`
        );
        return {
            todos: response.data.todos,
            pagination: response.data.pagination,
            next: page < response.data.pagination.pageCount ? page + 1 : undefined
        };
    } catch (error) {
        console.error("fetchTodos Error :>> ", error);
        throw error;
    }
};

export const useFetchTodos = (userId: string, status: string) => {
    return useInfiniteQuery({
        queryKey: ["todos", userId, status],
        queryFn: ({ pageParam = 1 }) => fetchTodos(userId, status, pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next,
    });
};