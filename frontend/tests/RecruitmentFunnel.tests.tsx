import {describe, test } from '@jest/globals';
import {screen, render, within, fireEvent} from "@testing-library/react";
import {GET_FUNNEL, RecruitmentFunnel} from "../src/components/recruitment-funnel/RecruitmentFunnel";
import {MockedProvider} from "@apollo/client/testing";
import * as reactRouter from "react-router";
import QA from "../src/utils/QASelectorConstants";

describe('recruitment funnel',  () => {
    const funnelId = 3;
    const funnel = {
        vacancy: {
            name: 'fullstack developer'
        },
        stages: [
            {
                id: 1,
                name: 'interview',
                candidates: [],
            },
            {
                id: 2,
                name: 'offer',
                candidates: [],
            }
        ]
    };
    const mockRequest = [
        {
            request: {
                query: GET_FUNNEL,
                variables: {
                    id: funnelId
                }
            },
            result: {
                data: {
                    recruitmentFunnel: funnel
                }
            }
        }
    ];

    beforeEach(() => {
        jest.spyOn(reactRouter, 'useParams').mockImplementation(() => {
            return { id: funnelId.toString() }
        });
    });

    test('default state is correctly rendered', async () => {
        render(
            <MockedProvider mocks={mockRequest} addTypename={false}>
                <RecruitmentFunnel />
            </MockedProvider>
        );


        expect(await screen.findByTestId(QA.funnel.skeleton)).toBeInTheDocument();

        const renderedFunnel = await screen.findByTestId(QA.funnel.body);

        expect(document.title).toBe('Recruitment funnel / fullstack developer');

        const stageHeaders = within(renderedFunnel).getAllByTestId(QA.funnel.stage.header);
        expect(stageHeaders).toHaveLength(2);
        const stagePanels = within(renderedFunnel).getAllByTestId(QA.funnel.stage.panel);
        expect(stagePanels).toHaveLength(2);

        expect(stageHeaders[0]).toHaveAttribute('aria-selected', 'true');
        expect(stagePanels[0]).not.toHaveAttribute('hidden');
        expect(stagePanels[1]).toHaveAttribute('hidden');
        expect(stageHeaders[1]).toHaveAttribute('aria-selected', 'false');
    });

    test('selected stage is correctly rendered', async () => {
        const defaultStageName = funnel.stages[0].name;
        const selectedStageName = funnel.stages[1].name;

  
        render(
            <MockedProvider mocks={mockRequest} addTypename={false}>
                <RecruitmentFunnel />
            </MockedProvider>
        );


        const renderedFunnel = await screen.findByTestId(QA.funnel.body);
        expect(renderedFunnel).toBeInTheDocument();

        const defaultStageHeaderBeforeClick = screen.getByText(defaultStageName);
        expect(defaultStageHeaderBeforeClick).toHaveAttribute('aria-selected', 'true');
        const defaultStagePanelBeforeClick = screen.getByLabelText(defaultStageName);
        expect(defaultStagePanelBeforeClick).not.toHaveAttribute('hidden');

        const selectedStageHeaderBeforeClick = screen.getByText(selectedStageName);
        expect(selectedStageHeaderBeforeClick).toHaveAttribute('aria-selected', 'false');
        const selectedStagePanelBeforeClick = screen.getByLabelText(selectedStageName);
        expect(selectedStagePanelBeforeClick).toHaveAttribute('hidden');


        fireEvent.click(screen.getByText(selectedStageName));


        const defaultStageHeaderAfterClick = screen.getByText(defaultStageName);
        expect(defaultStageHeaderAfterClick).toHaveAttribute('aria-selected', 'false');
        const defaultStagePanelAfterClick = screen.getByLabelText(defaultStageName);
        expect(defaultStagePanelAfterClick).toHaveAttribute('hidden');

        const selectedStageHeaderAfterClick = screen.getByText(selectedStageName);
        expect(selectedStageHeaderAfterClick).toHaveAttribute('aria-selected', 'true');
        const selectedStagePanelAfterClick = screen.getByLabelText(selectedStageName);
        expect(selectedStagePanelAfterClick).not.toHaveAttribute('hidden');
    });
});