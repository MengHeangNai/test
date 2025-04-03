'use client';

import { handleEditStatus, handleSubmitToDo } from "@/app/action";
import SubmitButton from "@/components/general/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { Suspense, useState, useCallback, useMemo } from "react";
import { useFetchTodos } from "@/store/todo.store";
import { MoreHorizontal, Plus } from "lucide-react";

type Todo = {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELETED';
    createdAt: Date;
    authorId: string;
};

type Props = {
    userId: string;
}

const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELETED'] as const;
type StatusType = typeof STATUS_OPTIONS[number];

export default function TodoTable({ userId }: Props) {
    const [status, setStatus] = useState<StatusType>('PENDING');
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);


    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchTodos(userId, status);

    const loading = useMemo(() => isLoading || isFetchingNextPage, [isLoading, isFetchingNextPage]);
    const todos = useMemo(() => data?.pages.flatMap((page) => page.todos) || [], [data]);

    const handleStatusChange = useCallback((newStatus: StatusType) => {
        setStatus(newStatus);
    }, []);

    const handleOpenStatusDialog = useCallback((todo: Todo) => {
        setSelectedTodo(todo);
        setIsStatusDialogOpen(true);
    }, []);

    const updateTodoStatus = useCallback((id: string, newStatus: StatusType) => {
        try {
            setSelectedTodo(null);
            handleEditStatus(id, newStatus)
            todos.forEach((todo: any) => {
                if (todo.id === id) {
                    todo.status = newStatus;
                }
            });
            setIsStatusDialogOpen(false);
        } catch (error) {
            console.error('Failed to update todo status:', error);
        }
    }, [todos]);

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h1 className="text-2xl font-semibold">Todos</h1>

                <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((statusOption) => (
                        <Button
                            key={statusOption}
                            variant={status === statusOption ? "default" : "outline"}
                            onClick={() => handleStatusChange(statusOption)}
                        >
                            {statusOption.replace('_', ' ')}
                        </Button>
                    ))}

                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Todo
                    </Button>
                </div>
            </div>

            <Suspense fallback={<div className="text-center p-8">Loading todos...</div>}>
                {loading ? (
                    <div className="text-center p-8">Loading todos...</div>
                ) : todos.length === 0 ? (
                    <div className="text-center p-8 border rounded-lg bg-muted/10">
                        <p className="text-muted-foreground">No {status.toLowerCase()} todos found.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setIsCreateDialogOpen(true)}
                        >
                            Create your first todo
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead className="w-[200px]">Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[120px]">Status</TableHead>
                                        <TableHead className="w-[70px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {todos.map((todo: any, index: number) => (
                                        <TableRow key={todo.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium">{todo.title}</TableCell>
                                            <TableCell className="max-w-xs truncate">{todo.description}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${todo.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    todo.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                        todo.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {todo.status.replace('_', ' ')}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenStatusDialog(todo)}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {hasNextPage && (
                            <Button
                                variant="outline"
                                className="w-full mt-4"
                                onClick={loadMore}
                                disabled={isFetchingNextPage}
                            >
                                {isFetchingNextPage ? 'Loading more...' : 'Load more'}
                            </Button>
                        )}
                    </>
                )}
            </Suspense>

            {/* Create Todo Dialog - Properly separated from main UI */}
            {isCreateDialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-center">Create Todo</h2>
                            <form action={handleSubmitToDo} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" type="text" placeholder="Title" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" placeholder="Description" required />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsCreateDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <SubmitButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Update Dialog - Properly separated from main UI */}
            {isStatusDialogOpen && selectedTodo && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-center">Update Todo Status</h2>
                            <h4 className="font-medium  ">{selectedTodo.title}</h4>
                            <p className="text-sm text-muted-foreground mb-6  ">{selectedTodo.description}</p>

                            <div className="flex flex-col gap-2 mb-6">
                                {STATUS_OPTIONS.map((statusOption) => (
                                    <Button
                                        key={statusOption}
                                        variant={selectedTodo.status === statusOption ? "default" : "outline"}
                                        onClick={() => updateTodoStatus(selectedTodo.id, statusOption)}
                                        className="w-full"
                                    >
                                        {statusOption.replace('_', ' ')}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsStatusDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}