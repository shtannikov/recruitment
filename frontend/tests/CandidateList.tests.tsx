import {describe, test } from '@jest/globals';
import {screen, within} from "@testing-library/react";
import {Candidate, CandidateList} from "../src/components/recruitment-funnel/CandidateList";
import renderWithRouter from "./renderWithRouter";

describe('candidate list', () => {
    test('candidate has correct computed fields', () => {
        const candidate: Candidate = {
            id: 1,
            firstName: 'Eugene',
            middleName: 'Paul',
            lastName: 'Trouser',
            stageEntranceDateTimeUtc: '2023-06-13T15:34Z'
        }
        jest.setSystemTime(new Date(2020, 6, 15));


        renderWithRouter(<CandidateList candidates={[candidate]}/>);


        const renderedCandidate = screen.getByTestId('candidate');

        const renderedFullName = within(renderedCandidate).getByTestId('full name');
        expect(renderedFullName).toHaveTextContent('Eugene Paul Trouser');

        const renderedElapsedDays = within(renderedCandidate).getByTestId('elapsed days in the stage');
        expect(renderedElapsedDays).toHaveTextContent('1');   
    });
});