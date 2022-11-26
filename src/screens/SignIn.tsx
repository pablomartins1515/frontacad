import { useState } from 'react';
import { useNavigation } from "@react-navigation/native"
import { VStack, Image, Center, Text, Heading, ScrollView, useToast} from "native-base";
import { useForm, Controller } from 'react-hook-form';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { useAuth } from '@hooks/useAuth';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppError } from '@utils/AppError';

type FormData = {
    email: string;
    password: string;
}

export function SignIn () {
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    
    const { signIn } = useAuth();

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors }} = useForm<FormData>();

    function handleNewAccount(){
        navigation.navigate('signUp');
    }

    async function handleSignIn({ email, password }: FormData){
        try {
            setIsLoading(true);
            await signIn(email, password); 

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível entrar. Por favor, tente novamente mais tarde.';
           
            setIsLoading(false);

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

            
        } 
    }

    return (        
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}> 
            <VStack flex={1} px={10} pb={16}>
            
                <Image 
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
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
                        Acesse sua conta
                    </Heading>

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

                    <Button 
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={(isLoading)}
                        />
                </Center>           

                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda Não tem acesso?
                    </Text>

                    <Button 
                        title="Criar conta" 
                        variant={"outline"}
                        onPress={handleNewAccount}
                       />
                </Center>                          
            </VStack>
        </ScrollView>            
    );
}