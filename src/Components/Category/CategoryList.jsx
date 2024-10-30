import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, updateCategory } from '../../Store/categorySlice';

export default function CategoryList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const categoryStatus = useSelector((state) => state.categories.status);

  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [selectedHero, setSelectedHero] = useState(null);

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteCategory(id));
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setEditedName(category.name);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedName('');
  };

  const handleUpdate = async (id) => {
    dispatch(updateCategory({ id, data: { name: editedName } }));
    setEditId(null);
    setEditedName('');
  };

  const handleHeroChange = async (newHeroId) => {
    const previousHero = categories.find(category => category.isHeroSection);
    
    if (previousHero?.id === newHeroId) return;
  
    try {
      dispatch(updateCategory({ id: newHeroId, data: { isHeroSection: true } }));
      if (previousHero) {
        dispatch(updateCategory({ id: previousHero.id, data: { isHeroSection: false } }));
      }
      setSelectedHero(newHeroId);
      
    } catch (error) {
      console.error("Error updating hero section:", error.message);
    }
  };
  
  
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 text-start px-4 border-b">Category Name</th>
          <th className="py-2 text-start px-4 border-b">Hero Section</th>
          <th className="py-2 text-start px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="py-2 px-4 border-b">
              {editId === category.id ? (
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                <input
                type="text"
                value={category.name}
                className="appearance-none bg-transparent w-full border-transparent py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                disabled
              />
              )}
            </td>
            <td className="py-2 px-4 border-b">
              <span
              className='text-white  rounded py-1 px-2'
                onClick={() => handleHeroChange(category.id)}
                style={{
                  backgroundColor: category.id == selectedHero || category.isHeroSection ? 'green' : 'red',
                  cursor: 'pointer',
                }}
              >{category.isHeroSection ? "Yes": "No"}</span>
            </td>
            <td className="py-2 px-4 border-b flex gap-2">
              {editId === category.id ? (
                <>
                  <button
                    className="w-[80px] bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleUpdate(category.id)}
                  >
                    Update
                  </button>
                  <button
                    className="w-[80px] bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-[80px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-[80px] bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}
