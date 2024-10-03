import React from 'react';
import { render, screen } from '@testing-library/react';
import { SubdivisionDisplay } from './SubdivisionDisplay';


describe('SubdivisionDisplay Component', () => {
    it('renders learn prompt to create display component', () => {
        render(<SubdivisionDisplay />);
        const prompt = screen.getByText('Display subdivision data here');
        expect(prompt).toBeInTheDocument();
    });
});
