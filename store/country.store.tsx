import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';



export const useFetchCountries = () => {
    return useInfiniteQuery({
        queryKey: ["useFetchCountries"],
        queryFn: ({ pageParam = 1 }) => fetchCountries(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => lastPage.next,
    });
};

const fetchCountries = async (page: number = 1) => {
    try {
        const response = await axios.get<any>(
            `https://restcountries.com/v3.1/all`
        );

        const countries = response.data
        const nextPage = countries.length === 10 ? page + 1 : undefined;
        return {
            countries,
            next: nextPage,
            pagination: {
                total: response.headers['x-total-count'],
                page: page,
                pageSize: 10,
                pageCount: Math.ceil(response.headers['x-total-count'] / 10),
            },
        };
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};