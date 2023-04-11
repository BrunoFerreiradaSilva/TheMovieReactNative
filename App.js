import { SafeAreaView } from 'react-native';
import Routes from './src/Routes';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import { criaTabela } from './src/database/Movies';


export default function App() {
  useEffect(()=> {
    criaTabela()
  },[])

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar/>
      <Routes />
    </SafeAreaView>
  );
}
