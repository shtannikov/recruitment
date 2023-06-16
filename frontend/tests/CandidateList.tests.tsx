import {describe, test } from '@jest/globals';
import {screen, within} from "@testing-library/react";
import {Candidate, CandidateList} from "../src/components/recruitment-funnel/CandidateList";
import renderWithRouter from "./renderWithRouter";
import { default as QA } from "../src/utils/QASelectorConstants";

describe('candidate list', () => {
    test('candidate has correct computed fields', () => {
        const candidate: Candidate = {
            id: 1,
            firstName: 'Eugene',
            lastName: 'Trouser',
            stageEntranceDateTimeUtc: '2023-06-13T15:34Z'
        }
        jest.setSystemTime(new Date('2023-06-15T12:00Z'));


        renderWithRouter(<CandidateList candidates={[candidate]}/>);


        const renderedCandidate = screen.getByTestId(QA.candidateList.row);

        const renderedFullName = within(renderedCandidate).getByTestId(QA.candidateList.fullName);
        expect(renderedFullName.textContent).toBe('Eugene  Trouser');
        expect(renderedFullName.children[0]).toHaveAttribute('href', '/candidate/1');

        const renderedElapsedDays = within(renderedCandidate).getByTestId(QA.candidateList.elapsedDays);
        expect(renderedElapsedDays.textContent).toBe('1');
    });

    test('candidates are sorted from max to min elapsed days', () => {
        const candidates: Candidate[] = [
            {
                id: 1,
                firstName: 'Eugene',
                middleName: 'Paul',
                lastName: 'Trouser',
                stageEntranceDateTimeUtc: '2023-06-13T12:00Z'
            },
            {
                id: 3,
                firstName: 'James',
                lastName: 'Miller',
                stageEntranceDateTimeUtc: '2023-06-08T12:00Z'
            },
            {
                id: 2,
                firstName: 'Mary',
                middleName: 'Ann',
                lastName: 'Smith',
                stageEntranceDateTimeUtc: '2023-06-01T12:00Z'
            },
         ];
        jest.setSystemTime(new Date('2023-06-15T12:00Z'));


        renderWithRouter(<CandidateList candidates={candidates}/>);


        const candidateList = screen.getByTestId(QA.candidateList.body);
        const candidateRows = within(candidateList).getAllByTestId(QA.candidateList.row);
        expect(candidateRows).toHaveLength(3);

        const renderedFullName1 = within(candidateRows[0]).getByTestId(QA.candidateList.fullName);
        expect(renderedFullName1.textContent).toBe('Mary Ann Smith');
        expect(renderedFullName1.children[0]).toHaveAttribute('href', '/candidate/2');
        const renderedElapsedDays1 = within(candidateRows[0]).getByTestId(QA.candidateList.elapsedDays);
        expect(renderedElapsedDays1.textContent).toBe('14');

        const renderedFullName2 = within(candidateRows[1]).getByTestId(QA.candidateList.fullName);
        expect(renderedFullName2.textContent).toBe('James  Miller');
        expect(renderedFullName2.children[0]).toHaveAttribute('href', '/candidate/3');
        const renderedElapsedDays2 = within(candidateRows[1]).getByTestId(QA.candidateList.elapsedDays);
        expect(renderedElapsedDays2.textContent).toBe('7');

        const renderedFullName3 = within(candidateRows[2]).getByTestId(QA.candidateList.fullName);
        expect(renderedFullName3.textContent).toBe('Eugene Paul Trouser');
        expect(renderedFullName3.children[0]).toHaveAttribute('href', '/candidate/1');
        const renderedElapsedDays3 = within(candidateRows[2]).getByTestId(QA.candidateList.elapsedDays);
        expect(renderedElapsedDays3.textContent).toBe('2');
    });
});