import {NavigateFunction, useNavigate} from "react-router-dom";

export class AppNavigation {
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

export function useAppNavigation() {
    const navigate = useNavigate();
    return new AppNavigation(navigate);
}