import { Header } from './components/header';
import { Footer } from './components/footer';
import { List } from './components/list';

export function App() {
  return (
    <div className='h-full flex flex-col'>
      <Header />

      <main className='mt-12 container max-w-[900px] flex-1 px-8'>
        <List />
      </main>

      <Footer />
    </div>
  );
}
