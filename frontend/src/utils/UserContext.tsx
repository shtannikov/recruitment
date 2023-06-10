import React, {createContext, FC, ReactNode, useContext} from 'react';
import {useQuery} from "@apollo/client";
import {gql} from "../__generated__";
import {UserRole} from "../__generated__/graphql";

interface UserContextType {
    isLoading: boolean;
    userRole?: UserRole;
}

const UserContext = createContext<UserContextType>({
    isLoading: false,
    userRole: undefined,
});

const GET_ROLE = gql(`
    query GetUserRole {
      userSettings {
        userRole
      }
    }
`);

interface ContextProps {
    children: ReactNode;
}

export const UserContextProvider: FC<ContextProps> = ({ children }) => {
    const { loading: isLoading, data } = useQuery(
        GET_ROLE
    );

    return (
        <UserContext.Provider
            value={{ isLoading, userRole: data?.userSettings.userRole }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);