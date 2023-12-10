import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findById } from './client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const Details = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('identifier');
    const mediaType = queryParams.get('mediaType');

    const [data, setdata] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const s = await findById(id, mediaType);
                setdata(s.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, mediaType]);

    return (
        <Container className="mt-5">
          {data && (
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
                      <p>Artists: {data.album?.artists.map(artist => <a key={artist.id} href={artist.external_urls.spotify}>{artist.name}</a>).join(', ')}</p>
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
        </Container>
      );
};

export default Details