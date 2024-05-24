import React from 'react';
import moment from 'moment';

const VideoItem = ({ video }) => {
  return (
    <div className="video-item">
      <div className='video-item-img-container'>
          <img src={video.thumbnails.default.url} alt={video.title} />
      </div>
      
      <div className='video-item-text-data-container'>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <small>{moment(video.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</small>
      </div>
    </div>
  );
};

export default VideoItem;
