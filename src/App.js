import React from 'react';
import axios from 'axios'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Gallery from './View/Gallery/Gallery';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppContext from './context';
import Favourite from './View/Favourite/Favourite';
import {db} from './config/fbConfig'


class App extends React.Component {
  state = {
    cityName: '',
    cityKey: '',
    weather: '',
    isDay: null,
    query: '',
    images: '',
    latitude: null,
    longitude: null,
    likedPhotos: [],
    weatherIcon: '',
    temp: '',
    mainInfo: false
  }


  findCity() {
    axios.get('https://geolocation-db.com/json/')
      .then(res => {
        this.setState({
          cityName: res.data.city
        })
        this.getWeather()
      }).catch(err => console.error(err))
  }

  getWeather() {
    const apiKey = process.env.REACT_APP_API_KEY_OPENWEATHER
    const city = this.state.cityName;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(res => {
        this.setState({
          weather: res.data.weather[0].main,
          weatherIcon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
          temp: Math.floor(res.data.main.temp - 273,2)
        })
        this.findImage()
      }).catch(err => console.error(err))
  }

  findImage() {
    axios.get(`https://api.unsplash.com/search/photos?client_id=bc4ec03whyiAurIxr6bs7pZSifCw3Vi7ZHk2136vgQE&query=${this.state.weather}&page=1&per_page=100&orientation=landscape`)
      .then(res => {
        const full = res.data.results;
        const afterResize = []
        for (let i = 0; i < 9; i++) {
          let random = full[Math.floor(Math.random() * full.length, 2)]
          let indexOf = full.indexOf(random)
          afterResize.push(random)
          full.splice(indexOf, 1)
        }
        this.setState({
          images: afterResize
        })
      }).catch(err => {
        console.error(err)
      })
  }

  getData = () => {
    db.collection('favourite').get().then(snapshot => {
      const fav = []
      snapshot.forEach(doc => {
        const data = doc.data()
        data.item.firebaseID = doc.id
        fav.push(data.item)
      })
      this.setState({
        likedPhotos: fav
      })
    })
  }

  showMainInfo = () => {
    if (window.scrollY > 200 & !this.state.mainInfo) {
      alert('If you would like add photo to your favourite list, please double click on it!')
      this.setState({
        mainInfo: true
      })
    }
  }
  
  componentWillMount = () => {
    this.getData()
    this.findCity()
    window.addEventListener('scroll', this.showMainInfo)
  }


  clickForLike = (item) => {
    const { likedPhotos } = this.state;

    const duplicates = likedPhotos.filter(photo => {
      return photo.id === item.id
    })
    if (duplicates.length === 0) {
      db.collection('favourite').add({
        item
      }).then(() => this.getData())
    } else {
      alert('The photo already exist on your list. You have to really like it! :)')
    }

  }

  clickForUnlike = (item) => {
    let id = item.firebaseID
    db.collection('favourite').doc(id).delete().then(() => {
      this.getData()
    })
  }


  render() {

    const { images, likedPhotos, weatherIcon, temp } = this.state
    const contextElements = {
      clickForLike: this.clickForLike,
      clickForUnlike: this.clickForUnlike,
      imgs: images,
      likedPhotos: likedPhotos
    }
    
    return (    
      <AppContext.Provider value={contextElements}>
      <BrowserRouter>
        <Header icon={weatherIcon} temp={temp} like={likedPhotos.length}>dailyIMG</Header>
        <Switch>
            <Route exact path='/' component={Gallery} />
            <Route path='/favourite' component={Favourite} />
        </Switch>
        <Footer />
      </BrowserRouter>
      </AppContext.Provider>
    )
  }
}

export default App;
