import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import device from './config/device-sizes.json';
import { useDispatch, useSelector } from 'react-redux';
import { deviceType, orientation, setDevice, setIsDesktop, setOrientation } from './features/deviceSlice';
import { useEffect } from 'react';
import { RootState } from './app/store';

function App() {
  const dispatch = useDispatch();
  const detectOrientation = (): orientation => {
    return window.matchMedia("(orientation: landscape)").matches ? 'landscape' : 'portrait';
  };

  const getDeviceByOrientation = (orientation: orientation): deviceType => {
    let mobileMaxPixels = Number(device.mobile.portrait.maxPixels);
    let tabletMinPixels = Number(device.tablet.portrait.minPixels);
    let tabletMaxPixels = Number(device.tablet.portrait.maxPixels);
    let measurement = window.innerWidth;
    
    if (orientation === 'landscape') {
      mobileMaxPixels = Number(device.mobile.landscape.maxPixels);
      tabletMinPixels = Number(device.tablet.landscape.minPixels);
      tabletMaxPixels = Number(device.tablet.landscape.maxPixels);
      measurement = window.innerHeight;
    }
    
    if (measurement <= mobileMaxPixels) {
      return 'mobile';
    } else if (measurement >= tabletMinPixels && measurement <= tabletMaxPixels) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  const getDeviceParams = (): void => {
    const orientation = detectOrientation();
    const deviceType = getDeviceByOrientation(orientation);
    let isDesktop = false;
    if (deviceType === 'desktop') {
      isDesktop = true;
    }

    dispatch(setDevice(deviceType));
    dispatch(setOrientation(orientation));
    dispatch(setIsDesktop(isDesktop));
  };

  useEffect(() => { //Update Redux device state when window is resized.
    window.addEventListener('resize', getDeviceParams);
    return () => {
      window.removeEventListener('resize', getDeviceParams);
    }
  }, [dispatch])

  useEffect(() => { //Initialize Redux device state on first load.
    getDeviceParams()
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
