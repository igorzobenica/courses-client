import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-auto w-40" src="/src/assets/logo.svg" alt="Logo" />
              </div>
            </div>
            {/* <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-auto w-52" src="src/assets/logo.svg" alt="Logo" />
              </div>
            </div> */}
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="bg-primary text-white py-4 text-center">
        © 2024 Your Company
      </footer>
    </div>
  );
};

export default Layout;
