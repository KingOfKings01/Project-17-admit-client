import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function CategoryForm({ setCategories }) {
  const [name, setName] = useState('');

  const token = localStorage.getItem('token')
  const path = import.meta.env.VITE_APP_API + '/categories/'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(path, { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setCategories(pre => {
        console.log(pre);
        return [...pre, response.data]
      });
      setName('');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="bg-white p-4 rounded-lg shadow-md mb-6" onSubmit={handleSubmit}>
      <h3 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Add New Category
      </h3>
      <div className="mb-4 flex justify-between">
        <input
          className="shadow appearance-none border w-[75%]  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Category name'
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Category
        </button>
      </div>
    </form>
  );
}
