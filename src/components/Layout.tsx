import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Add padding-top to account for notification bar + header */}
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};