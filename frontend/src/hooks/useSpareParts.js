import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSpareParts = (category = 'All') => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/v2/spareparts?category=${category}`);
                setParts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, [category]);

    return { parts, loading, error };
};
