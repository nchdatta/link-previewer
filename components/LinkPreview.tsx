import { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    title: "",
    description: "",
    image: "",
};

const LinkPreview = () => {
    const [url, setUrl] = useState('');
    const [linkPreview, setLinkPreview] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://link-previewer-next.vercel.app/api/link-preview?url=${url}`);
                setLinkPreview(response.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (url) {
            fetchData();
        } else {
            setLinkPreview(initialState);
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

            {isLoading ?
                <div className='loader_wrapper'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <>
                    <h2>{linkPreview.title}</h2>
                    <p>{linkPreview.description}</p>
                    {linkPreview.image ? <img src={linkPreview.image} alt="Link Preview" /> : ""}
                </>
            }
        </div>
    );
};

export default LinkPreview;
