import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders root element having class as app', () => {
    const rootDiv = wrapper.find('.app');
    expect(rootDiv.length).toBe(1);
  });

  it('has a type of div', () => {
    const rootDiv = wrapper.find('.app');
    expect(rootDiv.type()).toBe('div');
  });

  describe('Header', () => {
    let header;

    beforeEach(() => {
      header = wrapper.find('.header');
    });

    it('has a length of one', () => {
      expect(header.length).toBe(1);
    });

    it('has two child divs', () => {
      expect(header.children()).toHaveLength(2);
    });

    describe('Left div', () => {
      let span;

      beforeEach(() => {
        const leftDiv = header.find('.left');
        span = leftDiv.find('.brand');
      });

      it('contains a span having class brand', () => {
        expect(span.length).toBe(1);
      });

      describe('Span', () => {
        it('has the expected text', () => {
          expect(span.text()).toBe('Purrfect Pals');
        });
      });
    });

    describe('Right div', () => {
      let rightDiv;

      it('contains a nav element', () => {
        rightDiv = header.find('.right');
        expect(rightDiv.find('nav').length).toEqual(1);
      });

      describe('Nav', () => {
        let nav;

        beforeEach(() => {
          nav = rightDiv.find('nav');
        });

        it('has a class named topnav', () => {
          expect(nav.prop('className')).toBe('topnav');
        });

        it('has four navlink children', () => {
          expect(nav.find('NavLink').length).toEqual(4);
        });

        it('has first link as home', () => {
          expect(nav.find('NavLink').at(0).text()).toBe('Home');
        });

        it('has first links to prop set to home', () => {
          expect(nav.find('NavLink').at(0).prop('to')).toBe('/home');
        });

        it('has second link as pets', () => {
          expect(nav.find('NavLink').at(1).text()).toBe('Pets');
        });

        it('has second links to prop set to pets', () => {
          expect(nav.find('NavLink').at(1).prop('to')).toBe('/pets');
        });

        it('has third link as about us', () => {
          expect(nav.find('NavLink').at(2).text()).toBe('About Us');
        });

        it('has third links to prop set to about', () => {
          expect(nav.find('NavLink').at(2).prop('to')).toBe('/about');
        });

        it('has fourth link as Contact', () => {
          expect(nav.find('NavLink').at(3).text()).toBe('Contact');
        });

        it('has fourth links to prop set to contact', () => {
          expect(nav.find('NavLink').at(3).prop('to')).toBe('/contact');
        });
      });
    });
  });

  it('renders outlet component', () => {
    const outlet = wrapper.find('Outlet');
    expect(outlet.length).toBe(1);
  });

  it('renders Toast Container component', () => {
    const outlet = wrapper.find('ToastContainer');
    expect(outlet.length).toBe(1);
  });
});
