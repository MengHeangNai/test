import modules from 'modules'
import * as React from 'react'
import {ViewProps} from 'react-native'
import AnimatedSplash from 'react-native-animated-splash-screen'

const intValue = {
  IsLoad: false,
  setIsLoad: (_: boolean) => {},
}

const SplashContext = React.createContext(intValue)

const useSplashContext = () => React.useContext(SplashContext)

export const useSplashIsLoaded = () => {
  const {setIsLoad} = useSplashContext()
  React.useEffect(() => {
    let _mounted = true
    if (_mounted) setIsLoad(true)
    return () => {
      _mounted = false
    }
  }, [])
}

export const SplashProvider = ({children}: ViewProps) => {
  const [IsLoad, setIsLoad] = React.useState(false)

  return (
    <SplashContext.Provider value={{IsLoad, setIsLoad}}>
      <AnimatedSplash
        logoWidth={150}
        logoHeight={150}
        translucent={true}
        isLoaded={IsLoad}
        // logoImage={modules.LOGO}
        backgroundColor={'transparent'}>
        {children}
      </AnimatedSplash>
    </SplashContext.Provider>
  )
}
