/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, updateMovie } from '../../Store/movieSlice';
import { fetchCategories } from '../../Store/categorySlice';

export default function MovieForm({ selectedMovie, onClose }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.items);

    const [formData, setFormData] = useState({
        name: selectedMovie ? selectedMovie.name : 'Hero',
        genre: selectedMovie ? selectedMovie.genre : 'No genre selected',
        description: selectedMovie ? selectedMovie.description : 'This is a test data',
        poster: selectedMovie ? selectedMovie.poster : 'no poster available',
        director: selectedMovie ? selectedMovie.director : 'AK',
        releaseDate: selectedMovie ? selectedMovie.releaseDate : '',
        language: selectedMovie ? selectedMovie.language : 'Hindi',
        imdbRating: selectedMovie ? selectedMovie.imdbRating : '8',
        trailerLink: selectedMovie ? selectedMovie.trailerLink : 'no link available',
        categoryId: selectedMovie ? selectedMovie.categoryId : '',
    });

    // State for Hero Section image and preview
    const [heroSectionImage, setHeroSectionImage] = useState(selectedMovie ? selectedMovie.heroSectionImage : '');
    const [heroSectionPreview, setHeroSectionPreview] = useState(selectedMovie ? selectedMovie.heroSectionImage : '');

    useEffect(() => {
        if (categories.length === 0) dispatch(fetchCategories());
    }, [dispatch, categories]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeroSectionImage(file);
            setHeroSectionPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData();
        // Append all fields from formData state
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        // Append the file separately
        data.append('heroSectionImage', heroSectionImage);
    
        try {
            if (selectedMovie) {
                dispatch(updateMovie({ id: selectedMovie.id, data }));
                alert("Movie Updated successfully!");
            } else {
                dispatch(addMovie(data));
                alert("Movie added successfully!");
            }
            onClose();
        } catch (e) {
            console.error('Error adding movie:', e.message);
            alert("Error adding movie. Please try again.");
        }
    };
    
    
    return (
        <div className='fixed left-0 top-0 w-full h-screen overflow-auto bg-[#00000061]'>
            <div className='mx-[15vw] my-12'>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
                    <h2 className='text-center text-2xl font-bold'>{selectedMovie ? 'Edit' : 'Add'} Movie Form</h2>

                        <input
                            type="text"
                            placeholder="Title"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    <div className='columns-2'>

                        {/* Category Dropdown */}
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleInputChange}
                            className="w-full my-2 p-2 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Director"
                            name="director"
                            value={formData.director}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />

                        <input
                            type="text"
                            placeholder="Poster URL"
                            name="poster"
                            value={formData.poster}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />

                        <input
                            type="date"
                            placeholder="Release Date"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />

                        <input
                            type="text"
                            placeholder="Genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />

                        <input
                            type="text"
                            placeholder="Language"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />

                        <input
                            type="text"
                            placeholder="IMDb Rating"
                            name="imdbRating"
                            value={formData.imdbRating}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />

                        <input
                            type="text"
                            placeholder="Trailer Link"
                            name="trailerLink"
                            value={formData.trailerLink}
                            onChange={handleInputChange}
                            required
                            className="w-full my-2 p-2 border rounded"
                        />
                    </div>

                    <textarea
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />

                    {/* Hero Section Image Upload with Preview */}
                    <label className="block">
                        <span className="text-gray-700">Hero Section Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            // value={heroSectionImage}
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                        {heroSectionPreview && (
                            <img src={heroSectionPreview} name="image" alt="Hero Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                        )}
                    </label>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        {selectedMovie ? 'Update' : 'Add'} Movie
                    </button>
                    <button className="w-full bg-gray-400 text-white p-2 rounded" onClick={onClose} type="button">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
