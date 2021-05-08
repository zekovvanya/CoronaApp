import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import Countries from '../coronaApp/Countries'


export default function App() {
    const url = "https://api.covid19api.com/summary";
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error,setError] = useState();
    useEffect(() => {
        const fetchCovidData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setData(response)
                setIsloading(false);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchCovidData();
    }, []);

  return (
    <View> 
      <View style = {styles.lable}>
          <Text style={{marginTop: 40, marginLeft: 5, fontWeight: "bold", fontSize: 20, alignSelf: 'center', }}>CoronaApp</Text>
      </View>
      <View style = {styles.container}>
        <FlatList 
          data = {data && data.Countries ? data.Countries : 0}
          renderItem = {({item}) => <Countries item={item}/>}
        /> 
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20, 
    alignItems: 'flex-start'
  },
});
