import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import { VStack, Image, Center, Text, Heading, ScrollView, useToast} from "native-base";
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from "@hooks/useAuth";
import { api } from '@services/api';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { AppError } from '@utils/AppError';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = { 
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6," A senha deve ter pelo menos 6 dígitos."),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), null], 'A confirmação da senha não confere.')

})

export function SignUp () {
    const [isLoading, setIsloading ] = useState(false);

    const toast = useToast();
    const {signIn} = useAuth();

    const { control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });
 
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack ();
    };

    async function handleSignUp({name, email, password}: FormDataProps){
       try {
        await api.post('/users', { name, email, password});
        await signIn(email, password);

       } catch (error) {
            setIsloading(false);

        const isAppError = error instanceof AppError;
        const title = isAppError ? error.message : 'Não foi possível criar conta. Por favor, tente mais tarde.';
         toast.show({
            title, 
            placement: 'top',
            bgColor: 'red.600',
         });
        }
       }
    


    return (        
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}> 
            <VStack flex={1} px={10} pb={16}>
            
                <Image 
                    source={BackgroundImg}
                    alt='Pessoas Treinando' 
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>                 
                <LogoSvg />

                <Text color={"gray.100"} fontSize={"sm"}>
                    Treine seu corpo e sua mente
                </Text>
                </Center>
                
                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Crie sua conta
                    </Heading>

                    <Controller 
                        control={control}
                        name="name"                        
                        render={({ field: { onChange, value }}) => (
                            <Input 
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMenssage={errors.name?.message}                                
                            />  
                        )}                         
                    />
              
                    <Controller 
                        control={control}
                        name="email"                      
                        render={({ field: { onChange, value }}) => (
                            <Input 
                                placeholder="E-mail"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                value={value}
                                errorMenssage={errors.email?.message}
                            />  
                        )}                         
                    />
                   
                  <Controller 
                        control={control}
                        name="password"                        
                        render={({ field: { onChange, value }}) => (
                            <Input 
                                placeholder="senha"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                                errorMenssage={errors.password?.message}                                
                            />  
                        )}                         
                    />

                    <Controller 
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value }}) => (
                            <Input 
                                placeholder="Confirme a senha"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyLabel="send"
                                errorMenssage={errors.password_confirm?.message}
                            />  
                        )}                         
                    />

                    <Button title="Criar e acessar"
                            onPress={handleSubmit(handleSignUp)}
                            isLoading={ isLoading }
                            />
                </Center>           

               
                <Button 
                    title="Voltar para o login" 
                    variant={"outline"} 
                    mt={24}
                    onPress={handleGoBack} 
                />               
            
               
            </VStack>
        </ScrollView>            
    );
}



