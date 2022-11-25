import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & { 
    errorMenssage?: string | null;
};

export function Input ({ errorMenssage = null, isInvalid, ...rest} : Props ) {
const invalid = !! errorMenssage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={4}>
            <NativeBaseInput 
                bg="gray.700"
                h={14}
                px={4}
                borderWidth={0}
                fontSize="md"
                color="white"
                fontFamily="body"
                
                {...rest}
                placeholderTextColor="gray.300"
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor:"red.600"
                }}
                _focus={
                    {
                        bg:"gray.700",
                        borderWidth: 1,
                        borderColor:"green.500"

                    }
                }
                />
                
                <FormControl.ErrorMessage>
                    {errorMenssage}
                </FormControl.ErrorMessage>
        </FormControl>        
    );
}