import { useState } from 'react';
import CategoryForm from '../Components/Layout/Category/CategoryForm';
import CategoryList from '../Components/Layout/Category/CategoryList';

export default function Category() {
  const [categories, setCategories] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <CategoryForm setCategories={setCategories} />
      <CategoryList categories={categories} setCategories={setCategories} />
    </div>
  );
}
