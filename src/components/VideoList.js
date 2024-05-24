import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoItem from './VideoItem';
import SearchBar from './SearchBar';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('desc');
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, [page, query, sort]);

  const fetchVideos = async () => {
    const response = await axios.get('http://localhost:3000/videos', {
      params: { page, limit: 10, q: query , sort}
    });
    setVideos(response.data.videos);
    setTotalPages(response.data.totalPages);
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <div className="sort-options">
        <label>Sort by: </label>
        <select value={sort} onChange={handleSortChange}>
          <option value="desc">Latest</option>
          <option value="asc">Earliest</option>
        </select>
      </div>
      <div className="video-list">
        {videos.map(video => (
          <VideoItem key={video._id} video={video} />
        ))}
      </div>
      <div className="pagination">
        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
};

export default VideoList;
