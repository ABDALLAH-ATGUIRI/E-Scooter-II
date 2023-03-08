import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Button } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps/lib/ProviderConstants';
import { MapMarker } from 'react-native-maps/lib/MapMarker';
import * as Location from "expo-location"

const { width, height } = Dimensions.get("window")

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
    latitude: 32.293058,
    longitude: -9.2350038,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
};



function Map({ moto }) {

    const [mapRegion, setMapRegion] = useState({
        latitude: 32.293058,
        longitude: -9.2350038,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const [ErrorMsg, setErrorMsg] = useState('')

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })

    }

    useEffect(() => {
        userLocation();
    }, [])
    return (

        <View>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={mapRegion} initialRegion={INITIAL_POSITION} >
                {moto?.location && <MapMarker coordinate={moto?.location} pinColor="green" title={moto?.title} />}
                <MapMarker coordinate={mapRegion} title='YOUR LOCATION' />
            </MapView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});


export default Map