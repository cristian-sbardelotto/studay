import { Header } from './components/header';
import { Footer } from './components/footer';
import { List } from './components/list';

export function App() {
  return (
    <div className='h-full flex flex-col gap-12'>
      <Header />

      <main className='container max-w-[900px] flex-1 px-8'>
        <List />
      </main>

      <Footer />
    </div>
  );
}
