import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoryList() {
  
  const [categories, setCategories] = useState([])
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [selectedHero, setSelectedHero] = useState(null);

  const token = localStorage.getItem('token')
  const path = import.meta.env.VITE_APP_API + '/categories/'

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(path,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
        const heroCategory = response.data.find(category => category.isHeroSection);
        if (heroCategory) setSelectedHero(heroCategory.id);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(path + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleHeroChange = async (id) => {
    try {
      await axios.put(path + id, 
        { isHeroSection: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedHero(id);
      const updatedCategories = categories.map(category =>
        category.id === id ? { ...category, isHeroSection: true } : { ...category, isHeroSection: false }
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error(error.message);
    }
  };

  const startEditing = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  const cancelEditing = () => {
    setEditCategoryId(null);
    setEditCategoryName('');
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(path + id, { name: editCategoryName }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCategories = categories.map(category =>
        category.id === id ? { ...category, name: editCategoryName } : category
      );
      setCategories(updatedCategories);
      cancelEditing();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="text-start py-2 px-4 border-b">Category Name</th>
          <th className="text-start py-2 px-4 border-b">Is Hero Section</th>
          <th className="text-start py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category.id}>
            <td className="py-2 px-4 border-b">
              {editCategoryId === category.id ? (
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <input
                  type="text"
                  value={category.name}
                  className="appearance-none w-full border-transparent py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  disabled
                />
              )}
            </td>
            <td className="py-2 px-4 border-b">
              <input
                type="radio"
                name="heroSection"
                checked={category.id === selectedHero || category.isHeroSection}
                onChange={() => handleHeroChange(category.id)}
              />
            </td>
            <td className="py-2 px-4 border-b">
              {editCategoryId === category.id ? (
                <>
                  <button
                    className="w-[5rem] bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleUpdate(category.id)}
                  >
                    Update
                  </button>
                  <button
                    className="w-[5rem] bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-[5rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => startEditing(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-[5rem] bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </>)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
