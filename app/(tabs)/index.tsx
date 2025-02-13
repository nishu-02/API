import { StyleSheet, View, TextInput, Text, Button, FlatList, Image } from 'react-native';
import React, { useState } from 'react';

export default function HomeScreen() {
  interface Ability {
    ability: {
      name: string;
      url: string;
    };
  }

  interface Sprite {
    front_default: string;
  }

  interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: Sprite;
    abilities: Ability[];
  }

  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const fetchPokemon = async () => {
    try {
      if (!name.trim()) return;

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('pokemon not found');
      
      const data: Pokemon = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching pokemon:", error);
      setPokemon(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter name..."
        value={name}
        onChangeText={setName}
        style={styles.input} 
      />
      
      <Button title="Search" onPress={fetchPokemon} />

      <View style={styles.pokemonContainer}>
        <Text style={styles.title}>{pokemon?.name?.toUpperCase() || 'No pokemon Found'}</Text>
        
        {pokemon?.sprites?.front_default ? (
          <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
        ) : (
          <Text style={styles.notFound}>No Image Available</Text>
        )}

        <Text style={styles.height}>Height: {pokemon?.height ?? 'N/A'}</Text>
        <Text style={styles.height}>Weight: {pokemon?.weight ?? 'N/A'}</Text>

        <FlatList
          data={pokemon?.abilities || []}
          keyExtractor={(item) => item.ability.name}
          renderItem={({ item }) => <Text style={styles.ability}>🌀 {item.ability.name.toUpperCase()}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    color: 'cyan',
  },
  pokemonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
  ability: {
    fontSize: 16,
    color: "green"
  },
  notFound: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  height: {
    color:'blue',
    fontSize: 16,
  }
});
