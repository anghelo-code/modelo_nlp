import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useModel } from '@/hooks/useModel';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState(null);
  const { outputMo, loading, error } = useModel(output);
  console.log('Resultado Funcion:', outputMo);

  const handleClassify = () => {
    setOutput(text);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Clasificador de Textos</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Ingrese el comentario</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Escribe aquí tu comentario..."
          onChangeText={setText}
          value={text}
          placeholderTextColor="#ccc9"
        />
        <TouchableOpacity onPress={handleClassify} style={styles.buttonCluster}>
          <Text style={styles.buttonText}>Clasificar</Text>
        </TouchableOpacity>
      </ThemedView>

      {loading && <ThemedText>Cargando...</ThemedText>}
      {error && <ThemedText>Error: {error.message}</ThemedText>}

      {!loading && (outputMo !== null) && (
        <ThemedView>
          <ThemedText>Resultado: {(outputMo.resultado_0 < outputMo.resultado_1) ? "Es violento" : "No es violento"}</ThemedText>
          <Collapsible title="Parámetros">
            <ThemedText>Positivo:  {(outputMo.resultado_1 * 100).toFixed(2)}%</ThemedText>
            <ThemedText>Negativo: {(outputMo.resultado_0 * 100).toFixed(2)}%</ThemedText>
          </Collapsible>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 5,
    color: 'white',
  },
  buttonCluster: {
    marginTop: 8,
    backgroundColor: '#202425',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    padding: 8,
  }
});
