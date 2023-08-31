import {describe, test} from '@jest/globals';
import {fireEvent, render, screen, within} from "@testing-library/react";
import {ChangeFunnelStageDialog, MOVE_TO_NEXT_STAGE} from "../src/components/candidate/ChangeFunnelStageDialog";
import QA from "../src/utils/QASelectorConstants";
import {MockedProvider} from "@apollo/client/testing";
import {UserRole} from "../src/__generated__/graphql";

describe('change funnel stage dialog',  () => {
    test('dialog button is successfully rendered',() => {
        const userRole = UserRole.Recruiter;
        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    },
                    {
                        id: 2,
                        order: 2,
                        name: 'offer'
                    }
                ]
            }
        };


        render(
            <MockedProvider>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={1}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );


        const changeStageButton = screen.getByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBeInTheDocument();
    });    

    test('dialog button is unavailable because user is hiring manager',() => {
        const userRole = UserRole.HiringManager;
        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    },
                    {
                        id: 2,
                        order: 2,
                        name: 'offer'
                    }
                ]
            }
        };


        render(
            <MockedProvider>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={1}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );


        const changeStageButton = screen.queryByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBe(null);
    });

    test('dialog button is unavailable because user role is undefined', () => {
        const userRole = undefined;
        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    },
                    {
                        id: 2,
                        order: 2,
                        name: 'offer'
                    }
                ]
            }
        };


        render(
            <MockedProvider>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={1}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );


        const changeStageButton = screen.queryByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBe(null);
    });

    test('dialog button is unavailable because there are no next stages',() => {
        const userRole = UserRole.Recruiter;
        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    }
                ]
            }
        };


        render(
            <MockedProvider>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={1}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );


        const changeStageButton = screen.queryByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBe(null);
    });

    test('stage changing is successfully saved', () => {
        const nextStageName = 'offer';
        const nextStageId = 2;

        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    },
                    {
                        id: nextStageId,
                        order: 2,
                        name: nextStageName
                    }
                ]
            }
        };

        const userRole = UserRole.Recruiter;

        const candidateId = 1;
        const motivation = 'he is really good!'
        const mockMutation = [
            {
                request: {
                    query: MOVE_TO_NEXT_STAGE,
                    variables: {
                        candidateId: candidateId,
                        nextStageId: nextStageId,
                        motivation: motivation
                    }
                },
                newData: jest.fn(() => ( {
                    data: {
                        candidates: {
                            moveToNextFunnelStage: {
                                succeeded: true
                            }
                        }
                    }
                }))
            }
        ];

        render(
            <MockedProvider  mocks={mockMutation} addTypename={false}>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={candidateId}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );
        
        const changeStageButton = screen.getByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBeInTheDocument();

        fireEvent.click(changeStageButton);

        const changeStageDialog = screen.getByTestId(QA.candidate.changeStage.dialog);
        expect(changeStageDialog).toBeInTheDocument();
        
        const commentInput = within(changeStageDialog).getByTestId(QA.candidate.changeStage.comment);
        fireEvent.change(within(commentInput).getByRole('textbox'), { target: {value: motivation} });

        const stagesSelect = within(changeStageDialog).getByTestId(QA.candidate.changeStage.nextStages);
        fireEvent.mouseDown(within(stagesSelect).getByRole('button'));

        fireEvent.click(screen.getByText(nextStageName));

        const saveButton = within(changeStageDialog).getByTestId(QA.candidate.changeStage.saveButton);
        fireEvent.click(saveButton);

        const error = screen.queryByTestId(QA.candidate.changeStage.error);
        expect(error).toBe(null);

        expect(mockMutation[0].newData).toHaveBeenCalled();
    });

    test('stage changing is not saved because comment is empty', () => {
        const comment = ''
 
        const nextStageName = 'offer';
        const nextStageId = 2;

        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    },
                    {
                        id: nextStageId,
                        order: 2,
                        name: nextStageName
                    }
                ]
            }
        };

        const userRole = UserRole.Recruiter;

        const candidateId = 1;

        const mockMutation = [
            {
                request: {
                    query: MOVE_TO_NEXT_STAGE,
                    variables: {
                        candidateId: candidateId,
                        nextStageId: nextStageId,
                        motivation: comment
                    }
                },
                newData: jest.fn(() => ( {
                    data: {
                        candidates: {
                            moveToNextFunnelStage: {
                                succeeded: true
                            }
                        }
                    }
                }))
            }
        ];

        render(
            <MockedProvider  mocks={mockMutation} addTypename={false}>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={candidateId}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );

        const changeStageButton = screen.getByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBeInTheDocument();

        fireEvent.click(changeStageButton);

        const changeStageDialog = screen.getByTestId(QA.candidate.changeStage.dialog);
        expect(changeStageDialog).toBeInTheDocument();

        const commentInput = within(changeStageDialog).getByTestId(QA.candidate.changeStage.comment);
        fireEvent.change(within(commentInput).getByRole('textbox'), { target: {value: comment} });

        const stagesSelect = within(changeStageDialog).getByTestId(QA.candidate.changeStage.nextStages);
        fireEvent.mouseDown(within(stagesSelect).getByRole('button'));

        fireEvent.click(screen.getByText(nextStageName));

        const saveButton = within(changeStageDialog).getByTestId(QA.candidate.changeStage.saveButton);
        fireEvent.click(saveButton);

        const error = screen.queryByTestId(QA.candidate.changeStage.error);
        expect(error).not.toBe(null);
        expect(error!.textContent).toBe('Comment can not be empty');

        expect(mockMutation[0].newData).not.toHaveBeenCalled();
    });

    test('stage changing is not saved because next stage is not selected', () => {
        const currentStage = {
            order: 1,
            funnel: {
                stages: [
                    {
                        id: 1,
                        order: 1,
                        name: 'interview'
                    },
                    {
                        id: 2,
                        order: 2,
                        name: 'offer'
                    }
                ]
            }
        };

        const userRole = UserRole.Recruiter;

        render(
            <MockedProvider>
                <ChangeFunnelStageDialog
                    userRole={userRole}
                    currentStage={currentStage}
                    candidateId={1}
                    updateCandidate={() => {}}
                />
            </MockedProvider>
        );

        const changeStageButton = screen.getByTestId(QA.candidate.changeStage.openButton);
        expect(changeStageButton).toBeInTheDocument();

        fireEvent.click(changeStageButton);

        const changeStageDialog = screen.getByTestId(QA.candidate.changeStage.dialog);
        expect(changeStageDialog).toBeInTheDocument();

        const commentInput = within(changeStageDialog).getByTestId(QA.candidate.changeStage.comment);
        fireEvent.change(within(commentInput).getByRole('textbox'), { target: {value: 'wow!'} });


        const saveButton = within(changeStageDialog).getByTestId(QA.candidate.changeStage.saveButton);
        fireEvent.click(saveButton);

        const error = screen.queryByTestId(QA.candidate.changeStage.error);
        expect(error).not.toBe(null);
        expect(error!.textContent).toBe('Stage must be selected');
    });
});