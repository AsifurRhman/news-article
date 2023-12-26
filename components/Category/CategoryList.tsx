import React from 'react'

import Link from 'next/link'
import { TCategory } from '@/app/types/type';





const getCategories = async (): Promise<TCategory[] | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
  
      if (res.ok) {
        const categories = await res.json();
        return categories;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

export default async function CategoryList() {


    const categoriesData = await getCategories();

    return (
    
        <div className='flex gap-2 text-sm flex-wrap'>
        {
            categoriesData &&
            categoriesData.map((category, index) => (
              <Link
                key={index}  
                className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
                href={`/categories/${category.categoryName}`}
              >
                {category.categoryName}
              </Link>
            ))
          }
          
            
        </div>
  )
}
