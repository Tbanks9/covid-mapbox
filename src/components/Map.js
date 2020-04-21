import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN


class Map extends React.Component {
  state = {
    countries: [],
    areas: [],
    viewport: {
      zoom: 1.2
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        '/data'
      )
      this.setState({
        countries: res.data, areas: res.data.areas
      })
      console.log(this.state.areas)
    } catch (err) {
      console.log(err)
    }
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  render() {
    const { viewport, areas } = this.state
    return (
      <ReactMapGL
        mapboxApiAccessToken={mapboxToken}
        {...viewport}
        height={'98vh'}
        width={'99vw'}
        mapStyle="mapbox://styles/tbanks9/ck91ggxcz0zhf1iqpez0aevkg"
        onViewportChange={this.handleViewportChange}
        maxZoom={13}
      >
        {areas.map((places, item) => (
          <Marker
            key={item}
            latitude={places.lat}
            longitude={places.long}
          >
            <p>{places.displayName}</p>
          </Marker>
        ))}
      </ReactMapGL>
    )
  }
}
export default Map