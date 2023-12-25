import { categoriesData } from '@/data'
import React from 'react'

export default function CreatePost() {
    return (
        <div>
            <h2>Create A Post</h2>

            <form>

                <input type="text" placeholder="title" />
                <textarea placeholder="content"> </textarea>
                <div>
                    <input type="text" placeholder=" Paste the link and click on Add" />
                    <button className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <select>
                    <option value="">Select A Category</option>
                    {
                        categoriesData && categoriesData.map(category =>
                            
                            <option key={category.id}  value = {category.name}>{category.name}</option>
                            )
                    }
                </select>
                

            </form>
        </div>
    )
}
