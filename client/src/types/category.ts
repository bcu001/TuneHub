export interface CategoryData {
    categories: Category[];
    currPage:number;
    limit:number;
    skip:number;
    totalCategories:number;
    totalPages:number; 
}

export interface Category{
    _id:string;
    name:string;
    description:string;
    image:string;
    slug:string;
    isActive:boolean;
    updateAt:string;
    createAt:string;
    _v:number;
}