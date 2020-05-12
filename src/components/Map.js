import React from 'react'
import ReactMapGL from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN


class Map extends React.Component {
  state = {
    total: [],
    viewport: {
      zoom: 1.2
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        '/v2/countries'
      )
      this.setState({
        total: res.data.map(info => {
          return (info.countryInfo)
        })
      })
      console.log(this.state.total)
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
    const { viewport, total } = this.state
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
        {total.map(places => (
          <p>{places.country}</p>
            // {/* <p>{places.country}</p> */}
            // {/* {places.countryInfo.map((sub, item) =>
            //   <Marker
            //     key={item}
            //     latitude={sub.lat}
            //     longitude={sub.long}
            //   >
            //     {sub.country}
            //   </Marker>
            // )} */}
        ))}
      </ReactMapGL>
    )
  }
}
export default Map

// async componentDidMount() {
//   try {
//     const res = await axios.get(
//       '/microsoft/Bing-COVID-19-Data/master/data/Bing-COVID19-Data.csv'
//     )
//     this.setState({
//       total: res.data, countries: res.data.areas
//     })
//     console.log(this.state.countries)
//   } catch (err) {
//     console.log(err)
//   }
// }