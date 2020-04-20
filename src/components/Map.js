import React from 'react'
import ReactMapGL from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN


class Map extends React.Component {
  state = {
    countries: [],
    viewport: {
      longitude: 0,
      latitude: 0,
      zoom: 1.2
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        '/data'
      )
      this.setState({
        countries: res.data
      })
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
    console.log(this.state.countries)
    const { viewport } = this.state
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
        {/* {this.state.countries.map(places => (
          <Marker>
            <p>{places.city}</p>
          </Marker>
        ))} */}
      </ReactMapGL>
    )
  }
}
export default Map