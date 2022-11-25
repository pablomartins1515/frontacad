
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';


const PHOTO_SIZE= 33 ;

export function Profile (){
    const [photoIsLoading, setPhotoIsLoading] = useState (false);
    const[ userPhoto, setUserPhoto ] = useState ('https://www.quadrorama.com.br/wp-content/uploads/2018/05/quadro-com-foto-imagem-personalizada.png');

    const toast = useToast();

     async function handleUserPhotoSelect () {
        setPhotoIsLoading(true);

        try {
                const photoSelected = await ImagePicker.launchImageLibraryAsync( {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });
            
            console.log(photoSelected)

            if (photoSelected.cancelled) {                
                return;
            }

            if (photoSelected.uri) {  
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);
                 
                if (photoInfo.size && (photoInfo.size /1024 / 1024) >5) {
                    return toast.show({
                        title:'Essa imagem é muito grande! Por favor, escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor:'red.600'                    
                    });

                }

                setUserPhoto(photoSelected.uri);   
            }
        
        } catch (error) {
            console.log(error);
        } finally {
            setPhotoIsLoading(false);
     }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />

                <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
                    <Center mt={6} px={10} >   
                        { photoIsLoading ?
                            <Skeleton 
                             w={PHOTO_SIZE}   
                             h={PHOTO_SIZE}
                            rounded="full"
                            startColor="gray.600"
                            endColor="gray.400"                            
                            /> 
                            :                           
                            <UserPhoto 
                                source={{ uri: userPhoto }}
                                alt= "Foto do Usuário"
                                size={PHOTO_SIZE}
                             />
                        }                 
                        
                        <TouchableOpacity onPress={handleUserPhotoSelect}>
                            <Text color="green.500" fontWeight="bold" fontSize="md" mt={4} mb={6}>
                                Alterar foto
                            </Text>
                        </TouchableOpacity>

                        <Input 
                            bg="gray.600"
                            placeholder='Nome'
                            >                                
                        </Input>

                        <Input 
                            bg="gray.600"
                            value='pablomartins1515@hotmail.com'
                            isDisabled={true}  
                            >                       
                        </Input>

                        <Heading color='gray.200' fontSize='md' mb={2} alignItems="flex-start" mt={12} fontFamily="heading">
                            Alterar Senha
                        </Heading> 

                        <Input 
                            bg='gray.600'
                            placeholder='Senha antiga'
                            secureTextEntry={true}
                            />
                            
                        <Input 
                            bg='gray.600'
                            placeholder='Nova senha'
                            secureTextEntry={true}
                            />

                        <Input 
                            bg='gray.600'
                            placeholder='Confirme nova senha'
                            secureTextEntry={true}
                            />

                        <Button 
                            title='Atualizar'
                            mt={4}
                            />
                </Center> 
            </ScrollView>                
        </VStack>        
    );
}