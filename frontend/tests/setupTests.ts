import "@testing-library/jest-dom/extend-expect";
import * as useAppNavigation from "../src/utils/useAppNavigation";

beforeEach(() => {
    jest.useFakeTimers();

    jest.spyOn(useAppNavigation, 'useAppNavigation').mockImplementation(() => {
        return {
            getCandidateUrl: (id) => `candidate/${id}`,
            getFunnelUrl: (id) => `funnel/${id}`,
            redirectToFunnel: (_) => {}
        }
    });
});