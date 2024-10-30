import { useState } from 'react';
import CategoryForm from '../Components/Category/CategoryForm';
import CategoryList from '../Components/Category/CategoryList';

export default function Category() {
  const [categories, setCategories] = useState([]); 

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <CategoryForm setCategories={setCategories} />
      <CategoryList categories={categories} setCategories={setCategories} />
    </>
  );
}
