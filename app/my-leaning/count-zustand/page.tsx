"use client";

import React, { memo } from "react";
import { useCounterStore } from "@/store/counter-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, RefreshCcwIcon, ArrowRightIcon } from "lucide-react";

const CounterPage = () => {
    const count = useCounterStore((state: any) => state.count);
    const increase = useCounterStore((state: any) => state.increase);
    const decrease = useCounterStore((state: any) => state.decrease);
    const reset = useCounterStore((state: any) => state.reset);
    const setCount = useCounterStore((state: any) => state.setCount);

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-gray-100">

            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg p-4">
                <CardTitle className="text-2xl font-bold text-center">Interactive Counter</CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                    <div className="text-6xl font-bold text-center py-4 px-8 bg-gray-50 rounded-lg w-50 text-gray-800">
                        {count}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <Button
                        onClick={increase}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
                    >
                        <PlusIcon size={16} />
                        Increase
                    </Button>

                    <Button
                        onClick={decrease}
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
                    >
                        <MinusIcon size={16} />
                        Decrease
                    </Button>

                    <Button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600"
                    >
                        <RefreshCcwIcon size={16} />
                        Reset
                    </Button>

                    <Button
                        onClick={() => setCount(100)}
                        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
                    >
                        <ArrowRightIcon size={16} />
                        Set to 100
                    </Button>
                </div>

                <CardDescription className="text-center p-3 bg-gray-50 rounded-lg text-gray-600">
                    <p className="mb-2 font-medium">Use the buttons above to modify the counter value.</p>
                    <p className="text-sm">Current count: <span className="font-semibold">{count}</span></p>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default CounterPage;