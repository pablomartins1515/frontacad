import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {VStack, HStack, FlatList, Heading, Text } from 'native-base';

import { appNavigatorRoutesProps } from "@routes/app.routes"

import { HomeHeader, } from '@components/HomeHeader';
import { Group } from '@components/Group'
import { ExerciseCard } from "@components/ExerciseCard";
 


export function Home (){
    const [groups, setGroups] =  useState(['costas', 'bícepes', 'tríceps', 'ombro']);
    const [exercises, setExercises] =  useState(['Puxada frontal', 'Remada Curvada', 'Remada unilateral', 'Levantamento terra']);
    const [groupSelected, setGroupSelected] = useState('costas');

    const navigation = useNavigation<appNavigatorRoutesProps>();

    function handleOpenExerciseDetails () {
        navigation.navigate('exercise');
        }
    return (
        
        <VStack flex={1} >
           <HomeHeader />

           <FlatList 
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group 
                        name={item} 
                        isActive={groupSelected === item }
                        onPress={() => setGroupSelected( item )}
                    />
                )}
            horizontal
            showsHorizontalScrollIndicator={false}                
            _contentContainerStyle={{ px:8}}
            my={10}
            maxH={10}
           />
                  
         
         <VStack flex={1} px={8}>        
            <HStack justifyContent="space-between" mb={5} >
                <Heading color="gray.200" fontSize="md" fontFamily="heading">
                    Exercícios
                </Heading>
                <Text color="gray.200" fontSize="sm">
                    {exercises.length}
                </Text>

            </HStack>    

            <FlatList 
                data={exercises}
                keyExtractor={ item => item }
                renderItem={({ item }) =>( <
                    ExerciseCard 
                    onPress={handleOpenExerciseDetails}
                    />

                )}
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ paddingBottom:20 }} />

            </VStack>
        </VStack>
    );      
}