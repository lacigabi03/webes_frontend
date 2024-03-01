import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TextInput, Button} from 'react-native';
import Ipcim from './Ipcim';



const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  

  const keresfuggveny=async ()=>{
  alert(text)
  var adatok={
    "bevitel1":text
  }
  try {
    const response = await fetch(Ipcim.Ipcim+'keresvaros',
    {
        
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    )
    
    const json = await response.json();
    setData(json);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
  }


  return (
    <View style={{flex: 1, padding: 24}}>
       
    <TextInput
        style={{height: 40}}
        placeholder="Írd be a várost!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
    <Button
        title ='Keresés'
        
        onPress={()=>keresfuggveny()}
        />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={{borderBottomWidth:2,borderColor:"red"}}>

            <View >
            <Text style={styles.text}>
              {item.erd_nev}
              </Text>
              
              
              <Text style={styles.textleiras}>
              {item.erd_szoveg}
              </Text>
              
            </View>

            <Text style={{color:"blue",height: 50 ,backgroundColor:"white", fontSize: 30, textAlign:'center', marginBottom:10}}>
              {item.varos_neve}
            </Text>

            <Image source={{uri:Ipcim.Ipcim+item.varos_kep}}
            style={
              {
                width:224,
                height:160,
                backgroundColor:'white',
                marginLeft:'auto'
              }
            }
            />


           
            

            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  
  text: {
    textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    borderColor: '#000', // Szegély színe
    borderWidth: 2, // Szegély vastagsága
    borderRadius: 10, // Szegély lekerekítése
    shadowColor: '#000', // Árnyék színe
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, // Árnyék opacitása
    shadowRadius: 3, // Árnyék sugarának sugara
    elevation: 5, // Androidon az árnyék megjelenítése
  },
 
  textleiras: {
    textAlign:"center",
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    borderColor: '#000', // Szegély színe
    borderWidth: 2, // Szegély vastagsága
    borderRadius: 10, // Szegély lekerekítése
    shadowColor: '#000', // Árnyék színe
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, // Árnyék opacitása
    shadowRadius: 3, // Árnyék sugarának sugara
    elevation: 5, // Androidon az árnyék megjelenítése
  }
  

  
});



export default App;


