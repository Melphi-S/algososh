import {Circle} from "./circle";
import {cleanup, render, screen, within} from "@testing-library/react";
import {ElementStates} from "../../../types/element-states";
import React from "react";

describe('Circle', () => {
    beforeEach(cleanup);
    it('should render without letters', function () {
        render(<Circle/>);
        const circle = screen.getByTestId("circle");
        expect(circle).toHaveTextContent('');
        expect(circle).toMatchSnapshot();
    });

    it('should render with letters', function () {
        render(<Circle letter='test'/>);
        const circle = screen.getByTestId("circle");
        expect(circle).toHaveTextContent('test');
        expect(circle).toMatchSnapshot();
    });

    it('should render with head as text', function () {
        render(<Circle head='head'/>);
        const circle = screen.getByTestId("circle");
        const head = screen.getByTestId("head");
        expect(head).toHaveTextContent('head');
        expect(head).toHaveClass('string');
        expect(circle).toMatchSnapshot();
    });

    it('should render with head as react-element', function () {
        render(<Circle head={<Circle letter='test' isSmall />}/>);
        const head = screen.getAllByTestId("head");
        const circle = within(head[0]).queryByTestId('circle');
        expect(circle).toBeInTheDocument();
        expect(head[0]).toHaveClass('element');
        expect(head).toMatchSnapshot();
    });

    it('should render with tail as text', function () {
        render(<Circle tail='tail'/>);
        const circle = screen.getByTestId("circle");
        const tail = screen.getByTestId("tail");
        expect(tail).toHaveTextContent('tail');
        expect(tail).toHaveClass('string');
        expect(circle).toMatchSnapshot();
    });

    it('should render with tail as react-element', function () {
        render(<Circle tail={<Circle letter='test' isSmall />}/>);
        const tail = screen.getAllByTestId("tail");
        const circle = within(tail[0]).queryByTestId('circle');
        expect(circle).toBeInTheDocument();
        expect(tail[0]).toHaveClass('element');
        expect(tail).toMatchSnapshot();
    });

    it('should render with index', function () {
        render(<Circle index={1}/>);
        const circle = screen.getByTestId("circle");
        const index = within(circle).getByTestId('index');
        expect(index).toHaveTextContent('1');
        expect(circle).toMatchSnapshot();
    });

    it('should render with small-prop', function () {
        render(<Circle isSmall/>);
        const circle = screen.getByTestId("circle");
        const circleCore = within(circle).getByTestId('circle-core');
        expect(circleCore).toHaveClass('small');
        expect(circle).toMatchSnapshot();
    });

    it('should render with default state', function () {
        render(<Circle state={ElementStates.Default}/>);
        const circle = screen.getByTestId("circle");
        const circleCore = within(circle).getByTestId('circle-core');
        expect(circleCore).toHaveClass('default');
        expect(circle).toMatchSnapshot();
    });

    it('should render with changing state', function () {
        render(<Circle state={ElementStates.Changing}/>);
        const circle = screen.getByTestId("circle");
        const circleCore = within(circle).getByTestId('circle-core');
        expect(circleCore).toHaveClass('changing');
        expect(circle).toMatchSnapshot();
    });

    it('should render with modified state', function () {
        render(<Circle state={ElementStates.Modified}/>);
        const circle = screen.getByTestId("circle");
        const circleCore = within(circle).getByTestId('circle-core');
        expect(circleCore).toHaveClass('modified');
        expect(circle).toMatchSnapshot();
    });
})