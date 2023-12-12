import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findById } from './client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import LoadingScreen from '../LoadingScreen/loading';
import { useDispatch } from "react-redux";
import { switchLoading } from "../../redux/loading";

const Details = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('identifier');
    const mediaType = queryParams.get('mediaType');

    const [data, setdata] = useState({}); 
    const dispatch = useDispatch(); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(switchLoading());
            try {
                const s = await findById(id, mediaType);
                dispatch(switchLoading());
                setdata(s.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(switchLoading());
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <LoadingScreen />
            <BsArrowLeft className="m-5 mb-0" style={{fontSize: '2rem', margin:'10px'}} onClick={() => navigate(-1)}>&larr; Back</BsArrowLeft>
            <Container className="mt-3">
                {(data && mediaType == 'tracks') && (
                    <>
                    <Row className="mb-4">
                        <Col>
                            <h1>{data.name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Card>
                            <Card.Body>
                            <Image src={data.images && data.images.length !== 0 ? data.images[0].url : data.album && data.album.images.length !== 0 ? data.album.images[0].url : ''} alt={data.name} fluid />
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Body>
                            <h4>Album Information</h4>
                            <p>Album Name: {data.album?.name}</p>
                            <p>Album Type: {data.album?.album_type}</p>
                            <p>Release Date: {data.album?.release_date}</p>
                            <p>Total Tracks: {data.album?.total_tracks}</p>
                            <p>Artists: {data.album?.artists.map(artist => <a key={artist.id} href={artist.external_urls.spotify}>{artist.name}</a>)}</p>
                            <p>Available Markets: {data.album?.available_markets.join(', ')}</p>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                        <Card>
                            <Card.Body>
                            <h4>Track Information</h4>
                            <p>Track Number: {data.track_number}</p>
                            <p>Duration: {Math.floor(data.duration_ms / 60000)}:{((data.duration_ms % 60000) / 1000).toFixed(0)}</p>
                            <p>Explicit: {data.explicit ? 'Yes' : 'No'}</p>
                            <p>Popularity: {data.popularity}</p>
                            <p>Preview URL: <a href={data.preview_url} target="_blank" rel="noopener noreferrer">Listen Here</a></p>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    </>
                )}
                {(data && mediaType === 'albums') && (
                    <>
                    {console.log(data)}
                        <Row className="mb-4">
                            <Col>
                                <h1>{data.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Image src={data.images && data.images.length !== 0 ? data.images[0].url : ''} alt={data.name} fluid />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <h4>Album Information</h4>
                                        <p>Album Name: {data.name}</p>
                                        <p>Album Type: {data.album_type}</p>
                                        <p>Release Date: {data.release_date}</p>
                                        <p>Total Tracks: {data.total_tracks}</p>
                                        <p>Artists: {data.artists?.map(artist => <a key={artist.id} href={artist.external_urls.spotify}>{artist.name}</a>)}</p>
                                        <p>Available Markets: {data.available_markets?.join(', ')}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
                {(data && mediaType === 'artists') && (
                    <>
                        <Row className="mb-4">
                            <Col>
                                <h1>{data.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Image src={data.images && data.images.length !== 0 ? data.images[0].url : ''} alt={data.name} fluid />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <h4>Artist Information</h4>
                                        <p>Followers: {data.followers?.total}</p>
                                        <p>Genres: {data.genres?.join(', ')}</p>
                                        <p>Popularity: {data.popularity}</p>
                                        <p>External URL: <a href={data.external_urls?.spotify} target="_blank" rel="noopener noreferrer">Open in Spotify</a></p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
                {(data && mediaType === 'playlists') && (
                    <>
                        <Row className="mb-4">
                            <Col>
                                <h1>{data.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Image src={data.images && data.images.length !== 0 ? data.images[0].url : ''} alt={data.name} fluid />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <h4>Playlist Information</h4>
                                        <p>Collaborative: {data.collaborative ? 'Yes' : 'No'}</p>
                                        <p>Description: {data.description || 'No description available'}</p>
                                        <p>Owner: <a href={data.owner?.external_urls?.spotify} target="_blank" rel="noopener noreferrer">{data.owner?.display_name}</a></p>
                                        <p>Total Tracks: {data.tracks?.total}</p>
                                        <p>External URL: <a href={data.external_urls?.spotify} target="_blank" rel="noopener noreferrer">Open in Spotify</a></p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
)}
            </Container>
        </div>
      );
};

export default Details