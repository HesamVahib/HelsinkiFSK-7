import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3005/users');
    return response.data;
    }

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
};
