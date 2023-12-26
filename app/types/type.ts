export type TCategory = {
    id: string;
    categoryName: string;
  };
  
  export type TPost = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    publicId?: string;
    categoryName?: string;
    links: null | string[];
    createdAt: string;
    authorEmail: string;
    author: {
      name: string;
    };
  };