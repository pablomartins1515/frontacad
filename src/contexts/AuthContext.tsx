import { createContext, ReactNode, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";


export type AuthContextDataProps = {
    user: UserDTO;
    setUser: ( user: UserDTO) => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider ({ children }: AuthContextProviderProps ){
    const [user, setUser ] = useState ({
            id: '1',
            name: 'Rodrigo Pablo',
            email: 'rodrigo@email.com',
            avatar: 'rodrigo.png'
        });

        return (
        <AuthContext.Provider value={{ user, setUser }}>
          {children}
        </AuthContext.Provider> 
    );
}