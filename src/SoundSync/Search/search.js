import React, { useEffect } from 'react';
import { useState } from 'react';
import { getApiToken, findPlaylistBySearch, searchSpotify } from './client';
import { useLocation, useNavigate } from 'react-router-dom';


function Search() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState({
        tracks: { items: [] },
        albums: { items: [] },
        artists: { items: [] },
        playlists: { items: [] },
    });

    const [activeTab, setActiveTab] = useState('tracks');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleGoToDetails = (id, type) => {  
    // make plural for api purpose later
    if (type.charAt(type.length - 1) !== 's') {
        type += 's';
    }
    navigate(`/SoundSync/details?identifier=${encodeURIComponent(id)}&mediaType=${encodeURIComponent(type)}`);
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await searchSpotify(query);
        setSearchResults(s);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);


  return (
    <div className="container mt-5">
      <h1 className="mb-4">Spotify Search</h1>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'tracks' ? 'active' : ''}`}
            onClick={() => handleTabChange('tracks')}
          >
            Tracks
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'albums' ? 'active' : ''}`}
            onClick={() => handleTabChange('albums')}
          >
            Albums
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'artists' ? 'active' : ''}`}
            onClick={() => handleTabChange('artists')}
          >
            Artists
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'playlists' ? 'active' : ''}`}
            onClick={() => handleTabChange('playlists')}
          >
            Playlists
          </button>
        </li>
      </ul>

      <div className="row">
        {searchResults[activeTab].items.map((item) => (
            <div key={item.id} className="col-md-3 mb-4">
            <div className="card" onClick={() => handleGoToDetails(item.id, item.type)}>
                <img src={item.images && item.images.length !== 0 ? item.images[0].url : item.album && item.album.images.length !== 0 ? item.album.images[0].url : ''} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    {item.type === 'track' && <p className="card-text">Artist: {item.artists[0].name}</p>}
                    {item.type === 'album' && <p className="card-text">Release Date: {item.release_date}</p>}
                    {item.type === 'artist' && <p className="card-text">Followers: {item.followers.total}</p>}
                    {item.type === 'playlist' && <p className="card-text">Tracks: {item.tracks.total}</p>}
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Search;