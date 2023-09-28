import { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const LinkPreview = () => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/get-link-preview?url=${url}`);
                const html = response.data;
                const $ = cheerio.load(html);

                const metaTitle = $('meta[property="og:title"]').attr('content');
                const metaDescription = $('meta[property="og:description"]').attr('content');
                const metaImage = $('meta[property="og:image"]').attr('content');

                setTitle(metaTitle || '');
                setDescription(metaDescription || '');
                setImage(metaImage || '');
            } catch (error) {
                console.error(error);
            }
        };

        if (url) {
            fetchData();
        } else {
            setTitle('');
            setDescription('');
            setImage('');
        }
    }, [url]);

    return (
        <div>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <h2>{title}</h2>
            <p>{description}</p>
            {image ? <img src={image} alt="Link Preview" /> : ""}
        </div>
    );
};

export default LinkPreview;
