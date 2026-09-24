import api from "@/lib/axios";
import type { Category, CategoryData } from "@/types/category";
import { toast } from "sonner";

export async function getCategories(page:number): Promise<CategoryData> {
    const res = await api.get(`/categories?page=${page}&limit=6`);
    toast.success("getCategories")
    return res.data?.data;
}

export const getCategoryById = async(id:string): Promise<Category> =>{
    const res = await api.get(`/categories/${id}`);
    toast.success("getCategoryById")
    return res.data?.data;
}