import { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {VStack, HStack, FlatList, Heading, Text, useToast, Toast } from 'native-base';

import { appNavigatorRoutesProps } from "@routes/app.routes"

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciceDTO";

import { HomeHeader, } from '@components/HomeHeader';
import { Group } from '@components/Group'
import { ExerciseCard } from "@components/ExerciseCard";

export function Home (){
   
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] =  useState<ExerciseDTO[]>([]);
    const [groupSelected, setGroupSelected] = useState('costas');

    const toast = useToast();
    const navigation = useNavigation<appNavigatorRoutesProps>();

    function handleOpenExerciseDetails () {
        navigation.navigate('exercise');
        }

    async function fetchGroups (){
        try {
            const response = await api.get('./groups');
            setGroups(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos de Exercícios';

            toast.show({
                title,
                placement: 'top',
                bgColor:'red.600'
            });
        }
    }

    async function fetchExercisesByGroup (){
        try {
            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os Exercícios';

            toast.show({
                title,
                placement: 'top',
                bgColor:'red.600'
            });
        }
    }    

    useEffect(() => {
        fetchGroups();
    }, []);

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    }, [groupSelected]));
    

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
                keyExtractor={ item => item.id }
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