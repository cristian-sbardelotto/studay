import { Header } from './components/header';
import { Footer } from './components/footer';

export function App() {
  return (
    <div className='h-full flex flex-col'>
      <Header />

      <main className='flex-1'>
        <h2>Home</h2>
      </main>

      <Footer />
    </div>
  );
}
