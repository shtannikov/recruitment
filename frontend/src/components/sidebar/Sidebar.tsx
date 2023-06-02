import React, {FC} from 'react';
import {Skeleton} from "@mui/material";
import {useUserContext} from '../../utils/UserContext';
import {UserRole} from "../../__generated__/graphql";
import {HiringManagerSidebar} from "./HiringManagerSidebar";
import {LeadRecruiterSidebar} from "./LeadRecruiterSidebar";
import {RecruiterSidebar} from "./RecruiterSidebar";

const sidebarByRoleMap = new Map<UserRole, FC>([
    [UserRole.HiringManager, HiringManagerSidebar],
    [UserRole.Recruiter, RecruiterSidebar],
    [UserRole.LeadRecruiter, LeadRecruiterSidebar],
]);

export const Sidebar: FC = () => {
    const { isLoading, userRole } = useUserContext();

    const SpecificSidebar = sidebarByRoleMap.get(userRole!);

    return !isLoading && SpecificSidebar
        ? (<SpecificSidebar />)
        : <Skeleton variant="rectangular" height={150} />
}
