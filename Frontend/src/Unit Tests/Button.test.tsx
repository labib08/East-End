import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Link } from "react-router-dom";

const LoginButton = () => (
    <BrowserRouter>
      <Link to="/login">
        <button
          className="nav-login-cart-button w-36 h-12 outline-none border border-[#a3a3a3] rounded-full text-black text-lg font-medium bg-white cursor-pointer hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.5)] active:bg-[rgb(164,162,162)]"
          data-testid="login-button"
        >
          Login
        </button>
      </Link>
    </BrowserRouter>
  );

  describe('LoginButton component', () => {
    it('renders the button with the correct text', () => {
      render(<LoginButton />);
      const button = screen.getByTestId('login-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('nav-login-cart-button w-36 h-12 outline-none border border-[#a3a3a3] rounded-full text-black text-lg font-medium bg-white cursor-pointer hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.5)] active:bg-[rgb(164,162,162)]')
      expect(button).toHaveTextContent('Login');
    });

    it('renders a Link with the correct "to" attribute', () => {
      render(<LoginButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/login');
    });
    it('should apply hover styles when hovered', () => {
        render(<LoginButton />);
        const button = screen.getByTestId('login-button');
        fireEvent.mouseOver(button);
        expect(button).toHaveClass('hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.5)]');
    });
  });
