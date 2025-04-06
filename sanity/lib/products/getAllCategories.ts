import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Category } from '../../../sanity.types';


export const getAllCategories = async () =>{
    const ALL_CATEGORIES_QUERY = defineQuery(`
        *[_type == "category"]
        | order(name asc)
    `);

    try{
        // Fetch data from the Sanity API or use sanity fetch to send the query
        const categories = await sanityFetch({
            query: ALL_CATEGORIES_QUERY,
        });

        return categories.data || [];
    }catch(error){
        console.error("Error fetching category:", error);
        return [];
    }
};


