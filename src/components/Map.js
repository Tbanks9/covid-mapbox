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
        total: res.data, countries: res.data.areas
      })
      console.log(this.state.countries)
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
    const { viewport, countries, total } = this.state
    console.log(total)
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
        {/* {Object.values(this.state.total).map((item) => 
        <div>{item.totalConfirmed}</div>
        )} */}
        {countries.map((places, item) => (
          <Marker
            key={item}
            latitude={places.lat}
            longitude={places.long}
          >
            <p>{places.displayName}</p>
            {places.areas.map((sub, item) =>
              <Marker
                key={item}
                latitude={sub.lat}
                longitude={sub.long}
              >
                {sub.displayName}
              </Marker>
            )}
          </Marker>
        ))}
      </ReactMapGL>
    )
  }
}
export default Map