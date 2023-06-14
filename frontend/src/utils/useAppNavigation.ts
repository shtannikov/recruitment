import {NavigateFunction, useNavigate} from "react-router-dom";

interface IAppNavigation {
    getFunnelUrl(id:number): string;
    redirectToFunnel(id:number): void;
    getCandidateUrl(id: number): string;
}

class AppNavigation implements IAppNavigation {
    private readonly navigate: NavigateFunction;

    constructor(navigateFunction: NavigateFunction) {
        this.navigate = navigateFunction;
    }

    public getFunnelUrl(id:number) {
        return `/funnel/${id}`;
    }

    public redirectToFunnel(id:number) {
        const funnelUrl = this.getFunnelUrl(id);
        this.navigate(funnelUrl, { replace: true });
    }

    public getCandidateUrl(id:number) {
        return `/candidate/${id}`;
    }
}

export function useAppNavigation() : IAppNavigation {
    const navigate = useNavigate();
    return new AppNavigation(navigate);
}