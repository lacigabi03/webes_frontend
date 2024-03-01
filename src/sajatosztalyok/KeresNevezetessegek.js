import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TextInput, Button, StyleSheet} from 'react-native';
import Ipcim from './Ipcim';

const SZIN = "#F39C12";
const SZIN2 = '#F34912';

const KeresesNevezetessegek = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  



  const keresfuggveny = async () => {
    //alert(text)
    var adatok = {
      "bevitel1":text
    }
    try {
      const response = await fetch(Ipcim.Ipcim + 'keresnevezetessegek',
      {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <View style={{flex: 1, padding: 24, backgroundColor: '#F2FFC8'}}>

      

      <TextInput
        style={{
          height: 40,
          paddingLeft: 6,
          backgroundColor: '#F86941',
          borderRadius: 15,
          
               
        }}
        placeholder="Kereséshez írj be valamit!"
        selectionColor={SZIN}
        
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />

        <View 
        style=
        {
          {
            paddingLeft: 300,
            paddingRight: 300,
            paddingTop: 20,
                             
          }
        }
        >
      <Button
        title='Keresés'
        titleStyle={{ color: 'white', marginHorizontal: 20, }}
        
        onPress=
        {
          ()=> keresfuggveny()
        }
        
      />
        </View>

      
        <FlatList
          data={data}
          keyExtractor={({Nevezetesseg_id}) => Nevezetesseg_id}
          renderItem={({item}) => (
            <View>
            <Text style=
            {
              {
                textAlign:'center', 
                paddingTop: 5, 
                fontSize: 30, 
                backgroundColor: '#DEFF96',
                
                borderBlockStartColor: '#38451A'               
              }                
            }               
            >
              {item.Orszag_nev}
            </Text>
            <Text style=
            {
              {
                paddingTop: 20,
                paddingBottom: 20
              }
            }>
            |___{item.Nevezetesseg_nev}___|    {item.Nevezetesseg_szoveg}
          </Text>
          </View>
          )}
        />
   
    </View>
  );
};
















const styles =StyleSheet.create({
  gomb: {
      
      
      
      
      
  }
});

export default KeresesNevezetessegek;